/* 15/01/19 */

const int pin1 = 0;
const int pin2 = 1;
const int pin3 = 2;
int val1 = 0;  
int val2 = 0;
int val3 = 0;

void setup()
{
  Serial.begin(9600);   
  pinMode(pin1, INPUT);   
  pinMode(pin2, INPUT);     
  pinMode(pin3, INPUT);        
}

void loop()
{
  val1 = analogRead(pin1);     
  val2 = analogRead(pin2);  
  val3 = analogRead(pin3);  
  Serial.print("Val A0 (V):");
  Serial.println((float)val1/1024*5);
  Serial.print("Val A1 (V):");             
  Serial.println((float)val2/1024*5);
  Serial.print("Val A2 (V):");
  Serial.println((float)val3/1024*5);
  Serial.println("-------------------");   
  delay(1000);
}
