import speech_recognition as sr
import pyautogui as pg
import random
import time

def listen():
    with sr.Microphone(device_index = 0, sample_rate = sample_rate, 
                        chunk_size = chunk_size) as source:
        r.adjust_for_ambient_noise(source)
        print("Say Something")
        print("log: listening to audio...")
        audio = r.listen(source)
        print("log: audio recorded")
             
        try:
            print("Recognizing...")
            text = r.recognize_google(audio)
            return text
              
        except:
            return("Failed to extract text from audio.")

mic_name = "USB Device 0x46d:0x825: Audio (hw:1, 0)"
sample_rate = 48000
chunk_size = 2048

while True:
    r = sr.Recognizer()
    text = listen().lower()
    print(text)

    if 'ethiopia' in text:
        pg.press('E')
    elif 'madagascar' in text:
        pg.press('M')
    elif 'next' in text:
        pg.press('S')
    elif 'previous' in text:
        pg.press('A')
    elif 'random' in text and 'country' in text:
        pg.press(random.choice(['E', 'M']))
        
    time.sleep(2)        
