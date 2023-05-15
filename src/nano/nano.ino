#include<NewPing.h>
#define BAUD 9600
#define TRIGGER_PIN_US 6
#define ECHO_PIN_US 2
#define maxVzdalenost 400
//#define RX_WIFI 8
//#define TX_WIFI 7

/*
LORA
D13
D12
D11
D10
D9
D3
D4
D5

ULTRA-SOUND
D6 - RX
D2 - TX
*/

#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include "secret.h"

#ifdef COMPILE_REGRESSION_TEST
# define FILLMEIN 0
#else
# warning "You must replace the values marked FILLMEIN with real values from the TTN control panel!"
# define FILLMEIN (#dont edit this, edit the lines that use FILLMEIN)
#endif

void os_getArtEui (u1_t* buf) { }
void os_getDevEui (u1_t* buf) { }
void os_getDevKey (u1_t* buf) { }

static uint8_t payload[2];
static osjob_t sendjob;
const unsigned TX_INTERVAL = 10;
// status se jen změní pokud lastStatus je jiný jako nová hodnota
static uint8_t status = 1;
static uint8_t lastStatus = 3;
const lmic_pinmap lmic_pins = {
    .nss = 10,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 9,
    .dio = {3, 4, 5},
};
NewPing sonar(TRIGGER_PIN_US, ECHO_PIN_US, maxVzdalenost);
//SoftwareSerial softSerial(RX_WIFI, TX_WIFI);

void onEvent (ev_t ev) {
    switch(ev) {
        case EV_SCAN_TIMEOUT:
//            Serial.println(F("EV_SCAN_TIMEOUT"));
            break;
        case EV_BEACON_FOUND:
//            Serial.println(F("EV_BEACON_FOUND"));
            break;
        case EV_BEACON_MISSED:
//            Serial.println(F("EV_BEACON_MISSED"));
            break;
        case EV_BEACON_TRACKED:
//            Serial.println(F("EV_BEACON_TRACKED"));
            break;
        case EV_JOINING:
//            Serial.println(F("EV_JOINING"));
            break;
        case EV_JOINED:
//            Serial.println(F("EV_JOINED"));
            break;
        case EV_JOIN_FAILED:
//            Serial.println(F("EV_JOIN_FAILED"));
            break;
        case EV_REJOIN_FAILED:
//            Serial.println(F("EV_REJOIN_FAILED"));
            break;
        case EV_TXCOMPLETE:
//            Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
            if (LMIC.txrxFlags & TXRX_ACK)
//              Serial.println(F("Received ack"));
            if (LMIC.dataLen) {
//              Serial.println(F("Received "));
//              Serial.println(LMIC.dataLen);
//              Serial.println(F(" bytes of payload"));
            }
            // Schedule next transmission
            os_setTimedCallback(&sendjob, os_getTime()+sec2osticks(TX_INTERVAL), do_send);
            break;
        case EV_LOST_TSYNC:
//            Serial.println(F("EV_LOST_TSYNC"));
            break;
        case EV_RESET:
//            Serial.println(F("EV_RESET"));
            break;
        case EV_RXCOMPLETE:
            // data received in ping slot
//            Serial.println(F("EV_RXCOMPLETE"));
            break;
        case EV_LINK_DEAD:
//            Serial.println(F("EV_LINK_DEAD"));
            break;
        case EV_LINK_ALIVE:
//            Serial.println(F("EV_LINK_ALIVE"));
            break;
        case EV_TXSTART:
//            Serial.println(F("EV_TXSTART"));
            break;
        case EV_TXCANCELED:
//            Serial.println(F("EV_TXCANCELED"));
            break;
        case EV_RXSTART:
            break;
        case EV_JOIN_TXCOMPLETE:
//            Serial.println(F("EV_JOIN_TXCOMPLETE: no JoinAccept"));
            break;
        default:
//            Serial.print(F("Unknown event: "));
//            Serial.println((unsigned) ev);
            break;
    }
}

// neměnit
void do_send(osjob_t* j) {
  if (LMIC.opmode & OP_TXRXPEND) {
//        Serial.println(F("OP_TXRXPEND, not sending"));
  } else {
    uint8_t statusT = getStatus();
    byte lowStatus = lowByte(statusT);
    payload[0] = lowStatus;
    LMIC_setTxData2(1, payload, sizeof(payload)-1, 0);
  }
}

//neměnit
void setup() {
  while (!Serial); // wait for Serial to be initialized
    Serial.begin(BAUD);

    delay(100);     
//    Serial.print(F("SETUP!! @"));
//    Serial.println(BAUD);

    // LMIC init
    os_init();
    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();

    // něco se initiliazuje
    #ifdef PROGMEM
    uint8_t appskey[sizeof(APPSKEY)];
    uint8_t nwkskey[sizeof(NWKSKEY)];
    memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
    memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
    LMIC_setSession (0x13, DEVADDR, nwkskey, appskey);
    #else
    LMIC_setSession (0x13, DEVADDR, NWKSKEY, APPSKEY);
    #endif

    #if defined(CFG_eu868)
    LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
    LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(3, 867100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(4, 867300000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(5, 867500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(6, 867700000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(7, 867900000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
    LMIC_setupChannel(8, 868800000, DR_RANGE_MAP(DR_FSK,  DR_FSK),  BAND_MILLI);      // g2-band
    #elif defined(CFG_us915) || defined(CFG_au915)
    LMIC_selectSubBand(1);
    #elif defined(CFG_as923)

    #elif defined(CFG_kr920)

    #elif defined(CFG_in866)

    #else
    # error Region not supported
    #endif

    LMIC_setLinkCheckMode(0);

    LMIC.dn2Dr = DR_SF9;

    LMIC_setDrTxpow(DR_SF7,14);

    // Start job
    do_send(&sendjob);
}

//neměmit
void loop() {
    unsigned long now;
    now = millis();
    if ((now & 512) != 0) {
      digitalWrite(13, HIGH);
    }
    else {
      digitalWrite(13, LOW);
    }
  os_runloop_once();
}

uint8_t getStatus() {
  do {
    float range = 0;

    delay(1000);
    //5s se zbírají data a pak se zprůměrují
    for (int i = 0; i < 10; i++) {
      range += sonar.ping_cm();
      delay(500);
    }
    range = range / 5;
    //není volné když je to mezi 5cm a 120cm
    if ((range > 5.0) && (range < 120.0)) {
      status =  2;
    // volné místo jen když je to pod 120cm a nebo je to 0cm
    } else if ((range > 120.0) || (range == 0.0)) {
      status = 1;
    //jinak je to rozbité
    } else {
      status = 3;
    }
//    Serial.print("Current status "); Serial.println(status);
    //zde se mění status
    if (lastStatus != status) {
      lastStatus = status;
//      Serial.println(F("Packet queued"));
      return status;
    } else {
      lastStatus = status;
//      Serial.println(F("Packet is same"));
    }
    delay(5000);
  } while(status == lastStatus);
}