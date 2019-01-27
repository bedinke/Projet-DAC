
const int photoresistance=0;
int val_photo;

void setup() {
  Serial.begin(9600);
}

void loop() {
  val_photo=analogRead(photoresistance);
  Serial.println(val_photo);
  delay(2000);
}
