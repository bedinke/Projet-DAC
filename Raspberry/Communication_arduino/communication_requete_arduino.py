#Kevin BEDIN 29/11/18

import serial
from time import *


class Arduino():

    def __init__(self):
        """
            On initialise la communication série
        """
        port="/dev/ttyUSB0"
        try:
            connect=serial.Serial(port, baudrate=9600)
        except:
            port="/dev/ttyUSB1"
            connect=serial.Serial(port, baudrate=9600)
        self.__serie=connect
        sleep(2)

    def lecture(self,capteur):
        """
            Lit une ligne de la connection série "connect"
        """
        try:
            lec=self.__serie.readline().decode('ascii')
        except:
            lec=0
        capteur.valeur=lec


    def acquisition(self,capteur):
        """
            Envoie la requete à l'arduino et enregistre la valeur dans le capteur
        """
        self.__serie.write(capteur.requete.encode('ascii'))
        sleep(0.1)
        self.lecture(capteur)

    def activer(self,actionneur):
        """
            Envoie la requete d'activation d'un actionneur à l'arduino
        """
        self.__serie.write((actionneur.requete_on).encode('ascii'))
        actionneur.valeur=1

    def desactiver(self,actionneur):
        """
            Envoie la requete de désactivation d'un actionneur à l'arduino
        """
        self.__serie.write((actionneur.requete_off).encode('ascii'))
        actionneur.valeur=0
        


class Capteur():

    def __init__(self,nom):
        self.nom=nom
        self.requete=nom+'$'
        self.valeur=0
        
class Actionneur():

    def __init__(self,nom):
        self.nom=nom
        self.valeur=0
        self.requete_on=nom+"_ON$"
        self.requete_off=nom+"_OFF$"

if __name__=="__main__":
    """ 
        Test de quelques requêtes 
    """
    arduino=Arduino()
    capteur_temp1=Capteur("T1")
    capteur_temp2=Capteur("T2")
    capteur_humidite=Capteur("Hum")
    capteur_luminosite=Capteur("Lum")
    actionneur_ventil=Actionneur("Ventil")
    t=0
    while 1:
        print(t)
        if(t%5==0):
            if(actionneur_ventil.valeur==0):
                arduino.activer(actionneur_ventil)
            else:
                arduino.desactiver(actionneur_ventil)
        arduino.acquisition(capteur_temp1)
        arduino.acquisition(capteur_temp2)
        arduino.acquisition(capteur_humidite)
        arduino.acquisition(capteur_luminosite)
        print("Température 1: ",capteur_temp1.valeur)
        print("Température 2: ",capteur_temp2.valeur)
        print("Taux d'humidité: ",capteur_humidite.valeur)
        print("Valeur luminosité: ",capteur_luminosite.valeur)
        
        sleep(2)
        t+=1
