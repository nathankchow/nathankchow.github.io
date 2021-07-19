#Scrapes imascg-slstage-wiki.gamerch.com for original idol names of the specified song

import requests, os, bs4, time, random
def scrapeOriginalIdols(songname, write=True):
    print(songname)
    #specify url
    url = 'https://imascg-slstage-wiki.gamerch.com/' + songname

    #download page

    with open('originalIdols.json', 'a', encoding='utf-8') as file:
        try:
            res = requests.get(url)
            res.raise_for_status()
            soup = bs4.BeautifulSoup(res.text,features="html.parser")
            html = str(soup)
            html = html[html.index("MVオリジナル配置"):]
            html = html[:html.index("</table>")]
            originalIdolList = []
            for i in range(5):
                html = html[html.index('!important;">') + len('!important;">'):]
                if html[0] == '-' or html[0] == 'ラ':
                    originalIdolList.append('---')
                else:
                    html = html[html.index('title="') + len('title="'):]
                    html = html[html.index('">') + len('">'):]
                    originalIdolList.append(html[:html.index('</a')])
            originalIdolList = ['"' + name + '"' for name in originalIdolList]
        except:
            originalIdolList = ['"' + '---' + '"' for i in range(5)] #assume no singers in scenario of failure
        print(originalIdolList)
        file.write(f'''"{songname}": [{', '.join(originalIdolList)}],\n''')
        #expected output for kokoro moyou: ['---', '渋谷凛', '島村卯月', '本田未央', '---']
        time.sleep(3 + random.random() * 4) #randomized delay so http requests seem humanlike
    

if __name__ == '__main__':
    with open('songnames.txt',encoding='utf-8') as file:
        txt = file.read()
        songs = txt.split(',')
    for song in songs:
        scrapeOriginalIdols(song)