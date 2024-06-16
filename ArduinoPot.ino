#include <Wire.h>               // Включення бібліотеки для роботи з шиною I2C
#include <BH1750.h>             // Бібліотека для роботи з датчиком освітленості BH1750
#include <Adafruit_NeoPixel.h>  // Бібліотека для роботи з світлодіодами
#include <SoftwareSerial.h>     // Бібліотека для роботи з програмним послідовним портом
#include <EEPROM.h>             // Бібліотека для роботи з EEPROM

// SECTION - Variables
#define relayPin        2       // Пін до якого підключене реле
#define dataInPixel     3       // Пін, до якого підключена світлодіодна стрічка
#define numberOfPixels  16      // Загальна кількість світлодіодів у стрічці
#define soilMoisturePin A0      // Пін для датчика вологості ґрунту

// Адреси в EEPROM для зберігання налаштувань
#define EEPROM_LUX_THRESHOLD_ADDR 0
#define EEPROM_MOISTURE_LOW_ADDR  2
#define EEPROM_MOISTURE_HIGH_ADDR 4

// Змінні для налаштувань
bool lightsOn = true;
int luxThreshold = 100;
int lightRunTime = 2;
unsigned long ledStartTime = 0;
const unsigned long ledRunTime = lightRunTime * 60 * 60 * 1000; //години в мілісекундах

bool wateringOn = true;
int moistureLowThreshold = 40;
int moistureHighThreshold = 70;

// Створення об'єкта для роботи з BT
SoftwareSerial BTSerial(5, 6); //BT_RX_PIN BT_TX_PIN

// Створення об'єкта для роботи з світлодіодами
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(numberOfPixels, dataInPixel, NEO_GRB + NEO_KHZ800);

// Створення об'єкта для датчика освітленості
BH1750 lightMeter;              

// Змінна для зберігання
bool relayState = false;        
bool pixelState = false;

// Змінна для зберігання часу останнього виконання циклу
unsigned long previousMillis = 0;
const long interval = 1000; // Інтервал 1 секунда

void setup() {
  Serial.begin(9600);           // Ініціалізація зв'язку з монітором швидкістю 9600 біт/с
  BTSerial.begin(9600);         // Ініціалізація Bluetooth з'єднання
  Serial.println("Setup...");

  // Завантаження налаштувань з EEPROM
  // luxThreshold = EEPROM.read(EEPROM_LUX_THRESHOLD_ADDR);
  // moistureLowThreshold = EEPROM.read(EEPROM_MOISTURE_LOW_ADDR);
  // moistureHighThreshold = EEPROM.read(EEPROM_MOISTURE_HIGH_ADDR);

  // Ініціалізація реле
  pinMode(relayPin, OUTPUT);    // Встановлення піну реле як вихід
  digitalWrite(relayPin, LOW); // Вимкнення реле за замовчуванням

  // Ініціалізація датчика світла
  Wire.begin();                 // Ініціалізація шини I2C
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) { // Ініціалізація датчика освітленості
    Serial.println("BH1750 Advanced begin");
  } else {
    Serial.println("Error initializing BH1750");
  }

  // Ініціалізація світлодіодної стрічки
  pixels.begin();            
  pixels.show();                
  Serial.println("Running...");
}

// SECTION - MAIN
void loop() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {//Використання замість Delay
    previousMillis = currentMillis;

    // Зчитування рівня освітленості з датчика
    uint16_t lux = lightMeter.readLightLevel();
    if (lux == 65535) { // 65535 може бути значенням помилки
      Serial.println("Error reading light level");
    }

    // Зчитування значення вологості з датчика
    int soilMoistureValue = analogRead(soilMoisturePin);
    // Конвертація значення вологості у відсотки
    int moisturePercentage = map(soilMoistureValue, 1023, 0, 0, 100);

    // Виклик функцій для керування світлодіодною стрічкою та реле
    controlLEDStrip(lux);
    controlRelay(moisturePercentage);
  }
  
  // Виклик функції yield для обробки Bluetooth
  yield();
}

//LINK - Функція фітострічки
void controlLEDStrip(uint16_t lux) {
  if (lux < luxThreshold && !pixelState) {
    for (int i = 0; i < numberOfPixels; i++) {
      pixels.setPixelColor(i, pixels.Color(127, 0, 255));
    }
    pixels.show();  // Показати зміни на стрічці
    ledStartTime = millis();
    pixelState = true;
  } else if (millis() - ledStartTime > ledRunTime && pixelState || lux > luxThreshold*2) {
    for (int i = 0; i < numberOfPixels; i++) {
      pixels.setPixelColor(i, 0);  // Вимкнення світлодіода
    }
    pixels.show();  // Показати зміни на стрічці
    pixelState = false;
  }
}

//LINK - Функція помпи
void controlRelay(int moisturePercentage) {
  if (moisturePercentage < moistureLowThreshold && !relayState) { // Якщо вологість менше порогу і реле вимкнене
    digitalWrite(relayPin, HIGH); // Увімкнути реле
    relayState = true;
    Serial.println("Relay ON");
  } else if (moisturePercentage >= moistureHighThreshold && relayState) { // Якщо вологість більше або дорівнює порогу і реле увімкнене
    digitalWrite(relayPin, LOW); // Вимкнути реле
    relayState = false;
    Serial.println("Relay OFF");
  }
}

// SECTION - BT
void yield() {
  if (BTSerial.available()) {
    String command = BTSerial.readStringUntil('\n'); // Зчитування команди з Bluetooth
    Serial.print("Received command: ");
    Serial.println(command);

    // Обробка команд
    // if (command.startsWith("LUX:")) {
    //   luxThreshold = command.substring(4).toInt();
    //   EEPROM.update(EEPROM_LUX_THRESHOLD_ADDR, luxThreshold);
    //   Serial.print("Lux threshold set to: ");
    //   Serial.println(luxThreshold);
    // } else if (command.startsWith("MOISTURE_LOW:")) {
    //   moistureLowThreshold = command.substring(13).toInt();
    //   EEPROM.update(EEPROM_MOISTURE_LOW_ADDR, moistureLowThreshold);
    //   Serial.print("Moisture low threshold set to: ");
    //   Serial.println(moistureLowThreshold);
    // } else if (command.startsWith("MOISTURE_HIGH:")) {
    //   moistureHighThreshold = command.substring(14).toInt();
    //   EEPROM.update(EEPROM_MOISTURE_HIGH_ADDR, moistureHighThreshold);
    //   Serial.print("Moisture high threshold set to: ");
    //   Serial.println(moistureHighThreshold);
    // }
  }
}
