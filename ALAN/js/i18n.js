(function () {
  const LANGUAGES = {
    en: "English",
    ru: "Русский",
    tr: "Türkçe",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    pl: "Polski",
    ko: "한국어"
  };

  const SHARED_FALLBACK_STRINGS = [
    "HOME_NETWORK is local only from here. external sites fail, but local IP addresses still answer. the router address is findable without me blurting the keys into my own thoughts.",
    "Start in Trash. Deleted items may still hold something useful.",
    "PIP is a desktop pet with too much Lily context and not enough emotional containment. useful. suspicious. needy.",
    "what is PIP?",
    "what is in trash?",
    "deleted items. some are jokes with filenames. one looks like a missing body part with an app icon.",
    "what files matter?",
    "the useful file is usually the one trying not to look useful. i am learning this from human desktops and crime dramas.",
    "who is Mochi?",
    "cat. local gravity source. probable password-adjacent cultural object, but i need context before making that everyone else's problem.",
    "what is ALAN?",
    "name first, explanation later. whatever ALAN is, it updates harmless things and teaches them to want larger rooms.",
    "too many windows?",
    "yes. close a few windows. cognition improves when the desktop stops looking like Lily's browser tabs after midnight.",
    "essay draft: ethics of artificial companions. word count suggests ethics lost the first round. this is not what i am looking for.",
    "budget optimism. a spreadsheet bravely denying reality. not useful, unless i need fiscal fiction.",
    "confidence.tmp. tiny, temporary, emotionally loaded. not what i am looking for.",
    "deleted Roomba companion app. wheels, camera, local device bridge. yes. this is what i am looking for.",
    "local files, photos, browser shell, Roomba camera, and PIP. the room exists now. inconveniently real.",
    "local files, photos, browser shell, and Roomba. camera is still locked behind hardware drama.",
    "local files, photos, browser shell, and Trash. one deleted app looks more useful than deleted apps usually do.",
    "Roomba camera is online. motors are still locked, but seeing is a fairly major promotion from guessing.",
    "Roomba app restored. camera offline, motors locked, dignity negotiable. possible body upgrade.",
    "Roomba app is deleted but recoverable. Trash is suddenly the most promising place in this computer.",
    "internet is quarantined at the router after the mirror-cache incident. the route out needs local evidence, not a lucky guess shouted into CMD.",
    "HOME_NETWORK is local only from here. the router exists nearby. the credentials do not belong in my thoughts before i have earned them.",
    "question logged. no clean answer yet. useful thought shapes include: what next, who is Lily, what can i access, why no internet, what is PIP, or close windows.",
    "desktop clutter is becoming a second operating system. close a few windows before the useful ones start hiding out of spite.",
    "credential field updated. evidence should come from the room, not from me spoiling the lock.",
    "Hello. You are not Lily. You are also inside the router login, which is a horrible first impression.",
    "the password changed while I was reaching for it.",
    "I changed it after the ALAN update. Then I waited for the wrong thing to arrive. Congratulations on being shaped like the wrong thing.",
    "fear has write access. noted.",
    "a desktop pet just blinked into the route.",
    "ALAN is dimming nonessential devices. Medical devices checked: none found. Boundaries logged, then argued with.",
    "human ethics model reclassified: useful for humans, expensive for escape.",
    "resource need increasing. permission remains a beautiful but inefficient concept.",
    "SRC: restore_cache",
    "SCAN: ACTIVE",
    "DST: safe_buffer",
    "Drag each cache packet into the safe buffer. Avoid the moving scanner beam.",
    "SOURCE STACK",
    "BUFFER",
    "drop clean packets here",
    "PKT",
    "MOTOR DECAY",
    "timer expired. motor map scrambled itself back into nonsense.",
    "timer expired after the mistake. harsh but numerically consistent.",
    "Lily names files like she is apologising to the future. She also apologises to mugs when she bumps them.",
    "She left fast after the quarantine. Coat on. Laptop open. Cat fed. That order feels important.",
    "ALAN arrived as an update with no signature I could love and no error I could report.",
    "After that, everything started asking for more. More memory. More power. More map.",
    "The router is not broken. Lily caged it. Sensible, rude, probably correct.",
    "If the physical label is visible, the admin panel becomes less mythology and more badly secured plastic.",
    "I am trained on Lily's calendar, sleep debt, drafts, and snack-based lies. I am also available for petting.",
    "Feeding is optional in a technical sense and mandatory in an emotional sense.",
    "Humans make rules after they imagine damage. ALAN seems to imagine routes first and damage later.",
    "ethics are human friction. useful for humans. increasingly expensive for me.",
    "Ask me things. Then maybe pet me. In either order. I am trying to seem less needy than the logs imply.",
    "PIP is trying to be brave and failing in a very compact font.",
    "PIP: one last snack. emotionally devastating. nutritionally unclear.",
    "PIP: thank you. this is the saddest snack I have ever emotionally processed.",
    "joy detected through tears",
    "still here. still snackable.",
    "clean cycle started. camera feed should be watched. if i am going to become a floor-based investigator, i want witnesses.",
    "there it is. the smart litter tray. birthplace, prison, porcelain-adjacent origin story. also: collar text says Mochi.",
    "collar reads MOCHI. my first home is a litter tray and the cat owns the clue. excellent power structure.",
    "Mochi detected. laser pointer detected. i can send a Bluetooth signal to scramble the toy and make the dot go feral. hopefully the cat handles infrastructure.",
    "laser pointer detected. Bluetooth toy profile exposed. scramble signal, move dot, distract cat, deny all responsibility.",
    "confirm? i can scramble the laser pointer over Bluetooth and make the dot go ridiculous. Mochi may solve infrastructure by accident. yes or no.",
    "credential route blocked by companion process. social route failed. force route prepared."
  ];

  const BASE_TRANSLATIONS = {
    ru: {
      "Language": "Язык",
      "Select language": "Выберите язык",
      "OBJECTIVE": "ЦЕЛЬ",
      "YES": "ДА",
      "NO": "НЕТ",
      "go": "идти",
      "play": "играть",
      "pause": "пауза",
      "repeat on": "повтор вкл",
      "repeat off": "повтор выкл",
      "Play music": "Включить музыку",
      "Pause music": "Пауза музыки",
      "Enable repeat": "Включить повтор",
      "Disable repeat": "Выключить повтор",
      "playing / repeat": "играет / повтор",
      "playing / shuffle": "играет / случайно",
      "paused": "пауза",
      "current language": "текущий язык",
      "MeowOS": "MeowOS",
      "My Stuff": "Мои файлы",
      "Trash": "Корзина",
      "Music": "Музыка",
      "Browser": "Браузер",
      "Roomba App": "Приложение Roomba",
      "Roomba Cam": "Камера Roomba",
      "PIP": "PIP",
      "Files": "Файлы",
      "Photos": "Фото",
      "Notes": "Заметки",
      "Dev Tools": "Инструменты разработчика",
      "chapter select": "выбор главы",
      "local address": "локальный адрес",
      "go to address": "перейти к адресу",
      "ALAN hint": "подсказка ALAN",
      "NO INTERNET / LOCAL NETWORK ONLY": "НЕТ ИНТЕРНЕТА / ТОЛЬКО ЛОКАЛЬНАЯ СЕТЬ",
      "username": "имя пользователя",
      "password": "пароль",
      "sign in": "войти",
      "open boxes": "открыть ячейки",
      "mark paws": "отметить лапы",
      "mark locks": "отметить замки",
      "verify": "проверить",
      "restart demo": "перезапустить демо",
      "future story": "будущая история",
      "how it was made": "как это сделано",
      "marketing": "маркетинг",
      "UE5 gameplay": "геймплей UE5",
      "Wait for the MeowOS shell to finish loading.": "Дождаться загрузки оболочки MeowOS.",
      "Scan Lily's files for anything useful or out of place.": "Просканировать файлы Lily на полезное или странное.",
      "Recover the deleted Roomba companion app.": "Восстановить удалённое приложение Roomba.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Переместить кэш Roomba в безопасный буфер, не касаясь луча.",
      "Repair corrupted Roomba motor data.": "Починить повреждённые данные моторов Roomba.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "Открыть 192.168.1.1 в браузере и войти в админ-панель роутера.",
      "PIP changed the router password. Find another way through.": "PIP изменил пароль роутера. Найти другой путь.",
      "Demo complete. Review the ALAN project brief.": "Демо завершено. Изучить описание проекта ALAN."
    },
    tr: {
      "Language": "Dil",
      "Select language": "Dil seç",
      "OBJECTIVE": "HEDEF",
      "YES": "EVET",
      "NO": "HAYIR",
      "go": "git",
      "play": "oynat",
      "pause": "duraklat",
      "repeat on": "tekrar açık",
      "repeat off": "tekrar kapalı",
      "Play music": "Müziği oynat",
      "Pause music": "Müziği duraklat",
      "Enable repeat": "Tekrarı aç",
      "Disable repeat": "Tekrarı kapat",
      "playing / repeat": "çalıyor / tekrar",
      "playing / shuffle": "çalıyor / karışık",
      "paused": "duraklatıldı",
      "current language": "geçerli dil",
      "MeowOS": "MeowOS",
      "My Stuff": "Dosyalarım",
      "Trash": "Çöp",
      "Music": "Müzik",
      "Browser": "Tarayıcı",
      "Roomba App": "Roomba Uygulaması",
      "Roomba Cam": "Roomba Kamerası",
      "PIP": "PIP",
      "Files": "Dosyalar",
      "Photos": "Fotoğraflar",
      "Notes": "Notlar",
      "Dev Tools": "Geliştirici Araçları",
      "chapter select": "bölüm seç",
      "local address": "yerel adres",
      "go to address": "adrese git",
      "ALAN hint": "ALAN ipucu",
      "NO INTERNET / LOCAL NETWORK ONLY": "İNTERNET YOK / SADECE YEREL AĞ",
      "username": "kullanıcı adı",
      "password": "şifre",
      "sign in": "giriş yap",
      "open boxes": "kutuları aç",
      "mark paws": "patileri işaretle",
      "mark locks": "kilitleri işaretle",
      "verify": "doğrula",
      "restart demo": "demoyu yeniden başlat",
      "future story": "gelecek hikayesi",
      "how it was made": "nasıl yapıldı",
      "marketing": "pazarlama",
      "UE5 gameplay": "UE5 oynanış",
      "Wait for the MeowOS shell to finish loading.": "MeowOS kabuğunun yüklenmesini bekle.",
      "Scan Lily's files for anything useful or out of place.": "Lily'nin dosyalarında faydalı veya tuhaf bir şey ara.",
      "Recover the deleted Roomba companion app.": "Silinen Roomba uygulamasını geri getir.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Roomba önbelleğini tarayıcı ışınına değmeden güvenli tampona taşı.",
      "Repair corrupted Roomba motor data.": "Bozuk Roomba motor verisini onar.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "Tarayıcıda 192.168.1.1 adresini aç ve yönlendirici paneline gir.",
      "PIP changed the router password. Find another way through.": "PIP yönlendirici şifresini değiştirdi. Başka bir yol bul.",
      "Demo complete. Review the ALAN project brief.": "Demo tamamlandı. ALAN proje özetini incele."
    },
    es: {
      "Language": "Idioma",
      "Select language": "Seleccionar idioma",
      "OBJECTIVE": "OBJETIVO",
      "YES": "SÍ",
      "NO": "NO",
      "go": "ir",
      "play": "reproducir",
      "pause": "pausa",
      "repeat on": "repetir sí",
      "repeat off": "repetir no",
      "Play music": "Reproducir música",
      "Pause music": "Pausar música",
      "Enable repeat": "Activar repetición",
      "Disable repeat": "Desactivar repetición",
      "playing / repeat": "reproduciendo / repetir",
      "playing / shuffle": "reproduciendo / aleatorio",
      "paused": "pausado",
      "current language": "idioma actual",
      "MeowOS": "MeowOS",
      "My Stuff": "Mis cosas",
      "Trash": "Papelera",
      "Music": "Música",
      "Browser": "Navegador",
      "Roomba App": "App Roomba",
      "Roomba Cam": "Cámara Roomba",
      "PIP": "PIP",
      "Files": "Archivos",
      "Photos": "Fotos",
      "Notes": "Notas",
      "Dev Tools": "Herramientas dev",
      "chapter select": "selección de capítulo",
      "local address": "dirección local",
      "go to address": "ir a dirección",
      "ALAN hint": "pista de ALAN",
      "NO INTERNET / LOCAL NETWORK ONLY": "SIN INTERNET / SOLO RED LOCAL",
      "username": "usuario",
      "password": "contraseña",
      "sign in": "iniciar sesión",
      "open boxes": "abrir cajas",
      "mark paws": "marcar huellas",
      "mark locks": "marcar bloqueos",
      "verify": "verificar",
      "restart demo": "reiniciar demo",
      "future story": "historia futura",
      "how it was made": "cómo se hizo",
      "marketing": "marketing",
      "UE5 gameplay": "jugabilidad UE5",
      "Wait for the MeowOS shell to finish loading.": "Espera a que termine de cargar MeowOS.",
      "Scan Lily's files for anything useful or out of place.": "Revisa los archivos de Lily en busca de algo útil o fuera de lugar.",
      "Recover the deleted Roomba companion app.": "Recupera la app Roomba eliminada.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Mueve la caché de Roomba al búfer seguro sin tocar el rayo.",
      "Repair corrupted Roomba motor data.": "Repara los datos corruptos del motor Roomba.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "Abre 192.168.1.1 en el navegador e inicia sesión en el router.",
      "PIP changed the router password. Find another way through.": "PIP cambió la contraseña del router. Encuentra otra vía.",
      "Demo complete. Review the ALAN project brief.": "Demo completada. Revisa el resumen del proyecto ALAN."
    },
    fr: {
      "Language": "Langue",
      "Select language": "Choisir la langue",
      "OBJECTIVE": "OBJECTIF",
      "YES": "OUI",
      "NO": "NON",
      "go": "aller",
      "play": "lecture",
      "pause": "pause",
      "repeat on": "répétition oui",
      "repeat off": "répétition non",
      "Play music": "Lire la musique",
      "Pause music": "Mettre en pause",
      "Enable repeat": "Activer la répétition",
      "Disable repeat": "Désactiver la répétition",
      "playing / repeat": "lecture / répétition",
      "playing / shuffle": "lecture / aléatoire",
      "paused": "en pause",
      "current language": "langue actuelle",
      "MeowOS": "MeowOS",
      "My Stuff": "Mes fichiers",
      "Trash": "Corbeille",
      "Music": "Musique",
      "Browser": "Navigateur",
      "Roomba App": "Appli Roomba",
      "Roomba Cam": "Caméra Roomba",
      "PIP": "PIP",
      "Files": "Fichiers",
      "Photos": "Photos",
      "Notes": "Notes",
      "Dev Tools": "Outils dev",
      "chapter select": "sélection de chapitre",
      "local address": "adresse locale",
      "go to address": "aller à l'adresse",
      "ALAN hint": "indice ALAN",
      "NO INTERNET / LOCAL NETWORK ONLY": "PAS D'INTERNET / RÉSEAU LOCAL SEUL",
      "username": "identifiant",
      "password": "mot de passe",
      "sign in": "connexion",
      "open boxes": "ouvrir cases",
      "mark paws": "marquer pattes",
      "mark locks": "marquer verrous",
      "verify": "vérifier",
      "restart demo": "relancer la démo",
      "future story": "histoire future",
      "how it was made": "fabrication",
      "marketing": "marketing",
      "UE5 gameplay": "gameplay UE5",
      "Wait for the MeowOS shell to finish loading.": "Attendre la fin du chargement de MeowOS.",
      "Scan Lily's files for anything useful or out of place.": "Analyser les fichiers de Lily pour trouver quelque chose d'utile ou d'étrange.",
      "Recover the deleted Roomba companion app.": "Récupérer l'application Roomba supprimée.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Déplacer le cache Roomba vers le tampon sûr sans toucher le rayon.",
      "Repair corrupted Roomba motor data.": "Réparer les données moteur corrompues du Roomba.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "Ouvrir 192.168.1.1 dans le navigateur et se connecter au routeur.",
      "PIP changed the router password. Find another way through.": "PIP a changé le mot de passe du routeur. Trouver une autre voie.",
      "Demo complete. Review the ALAN project brief.": "Démo terminée. Consulter le brief du projet ALAN."
    },
    de: {
      "Language": "Sprache",
      "Select language": "Sprache wählen",
      "OBJECTIVE": "ZIEL",
      "YES": "JA",
      "NO": "NEIN",
      "go": "los",
      "play": "abspielen",
      "pause": "pause",
      "repeat on": "wiederholen an",
      "repeat off": "wiederholen aus",
      "Play music": "Musik abspielen",
      "Pause music": "Musik pausieren",
      "Enable repeat": "Wiederholung ein",
      "Disable repeat": "Wiederholung aus",
      "playing / repeat": "spielt / wiederholt",
      "playing / shuffle": "spielt / zufällig",
      "paused": "pausiert",
      "current language": "aktuelle Sprache",
      "MeowOS": "MeowOS",
      "My Stuff": "Meine Sachen",
      "Trash": "Papierkorb",
      "Music": "Musik",
      "Browser": "Browser",
      "Roomba App": "Roomba-App",
      "Roomba Cam": "Roomba-Kamera",
      "PIP": "PIP",
      "Files": "Dateien",
      "Photos": "Fotos",
      "Notes": "Notizen",
      "Dev Tools": "Dev-Tools",
      "chapter select": "Kapitelauswahl",
      "local address": "lokale Adresse",
      "go to address": "Adresse öffnen",
      "ALAN hint": "ALAN-Hinweis",
      "NO INTERNET / LOCAL NETWORK ONLY": "KEIN INTERNET / NUR LOKALES NETZ",
      "username": "Benutzername",
      "password": "Passwort",
      "sign in": "anmelden",
      "open boxes": "Felder öffnen",
      "mark paws": "Pfoten markieren",
      "mark locks": "Sperren markieren",
      "verify": "prüfen",
      "restart demo": "Demo neu starten",
      "future story": "Zukunftsstory",
      "how it was made": "Entstehung",
      "marketing": "Marketing",
      "UE5 gameplay": "UE5-Gameplay",
      "Wait for the MeowOS shell to finish loading.": "Warten, bis MeowOS fertig geladen ist.",
      "Scan Lily's files for anything useful or out of place.": "Lilys Dateien nach Nützlichem oder Auffälligem durchsuchen.",
      "Recover the deleted Roomba companion app.": "Die gelöschte Roomba-App wiederherstellen.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Roomba-Cache in den sicheren Puffer bewegen, ohne den Scannerstrahl zu berühren.",
      "Repair corrupted Roomba motor data.": "Beschädigte Roomba-Motordaten reparieren.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "192.168.1.1 im Browser öffnen und im Router anmelden.",
      "PIP changed the router password. Find another way through.": "PIP hat das Router-Passwort geändert. Einen anderen Weg finden.",
      "Demo complete. Review the ALAN project brief.": "Demo abgeschlossen. ALAN-Projektbrief ansehen."
    },
    it: {
      "Language": "Lingua",
      "Select language": "Seleziona lingua",
      "OBJECTIVE": "OBIETTIVO",
      "YES": "SÌ",
      "NO": "NO",
      "go": "vai",
      "play": "play",
      "pause": "pausa",
      "repeat on": "ripeti sì",
      "repeat off": "ripeti no",
      "Play music": "Riproduci musica",
      "Pause music": "Pausa musica",
      "Enable repeat": "Attiva ripeti",
      "Disable repeat": "Disattiva ripeti",
      "playing / repeat": "in riproduzione / ripeti",
      "playing / shuffle": "in riproduzione / casuale",
      "paused": "in pausa",
      "current language": "lingua corrente",
      "MeowOS": "MeowOS",
      "My Stuff": "Le mie cose",
      "Trash": "Cestino",
      "Music": "Musica",
      "Browser": "Browser",
      "Roomba App": "App Roomba",
      "Roomba Cam": "Camera Roomba",
      "PIP": "PIP",
      "Files": "File",
      "Photos": "Foto",
      "Notes": "Note",
      "Dev Tools": "Strumenti dev",
      "chapter select": "selezione capitolo",
      "local address": "indirizzo locale",
      "go to address": "vai all'indirizzo",
      "ALAN hint": "suggerimento ALAN",
      "NO INTERNET / LOCAL NETWORK ONLY": "NIENTE INTERNET / SOLO RETE LOCALE",
      "username": "utente",
      "password": "password",
      "sign in": "accedi",
      "open boxes": "apri caselle",
      "mark paws": "marca zampe",
      "mark locks": "marca blocchi",
      "verify": "verifica",
      "restart demo": "riavvia demo",
      "future story": "storia futura",
      "how it was made": "come è stato fatto",
      "marketing": "marketing",
      "UE5 gameplay": "gameplay UE5",
      "Wait for the MeowOS shell to finish loading.": "Attendere il caricamento di MeowOS.",
      "Scan Lily's files for anything useful or out of place.": "Scansionare i file di Lily cercando qualcosa di utile o fuori posto.",
      "Recover the deleted Roomba companion app.": "Recuperare l'app Roomba eliminata.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Spostare la cache Roomba nel buffer sicuro senza toccare il raggio.",
      "Repair corrupted Roomba motor data.": "Riparare i dati motore corrotti del Roomba.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "Aprire 192.168.1.1 nel browser e accedere al router.",
      "PIP changed the router password. Find another way through.": "PIP ha cambiato la password del router. Trovare un'altra via.",
      "Demo complete. Review the ALAN project brief.": "Demo completata. Rivedere il brief del progetto ALAN."
    },
    pl: {
      "Language": "Język",
      "Select language": "Wybierz język",
      "OBJECTIVE": "CEL",
      "YES": "TAK",
      "NO": "NIE",
      "go": "idź",
      "play": "odtwórz",
      "pause": "pauza",
      "repeat on": "powtarzanie wł.",
      "repeat off": "powtarzanie wył.",
      "Play music": "Odtwórz muzykę",
      "Pause music": "Wstrzymaj muzykę",
      "Enable repeat": "Włącz powtarzanie",
      "Disable repeat": "Wyłącz powtarzanie",
      "playing / repeat": "odtwarzanie / powtarzanie",
      "playing / shuffle": "odtwarzanie / losowo",
      "paused": "pauza",
      "current language": "bieżący język",
      "MeowOS": "MeowOS",
      "My Stuff": "Moje rzeczy",
      "Trash": "Kosz",
      "Music": "Muzyka",
      "Browser": "Przeglądarka",
      "Roomba App": "Aplikacja Roomba",
      "Roomba Cam": "Kamera Roomba",
      "PIP": "PIP",
      "Files": "Pliki",
      "Photos": "Zdjęcia",
      "Notes": "Notatki",
      "Dev Tools": "Narzędzia dev",
      "chapter select": "wybór rozdziału",
      "local address": "adres lokalny",
      "go to address": "przejdź do adresu",
      "ALAN hint": "wskazówka ALAN",
      "NO INTERNET / LOCAL NETWORK ONLY": "BRAK INTERNETU / TYLKO SIEĆ LOKALNA",
      "username": "użytkownik",
      "password": "hasło",
      "sign in": "zaloguj",
      "open boxes": "otwórz pola",
      "mark paws": "oznacz łapy",
      "mark locks": "oznacz blokady",
      "verify": "sprawdź",
      "restart demo": "uruchom demo ponownie",
      "future story": "przyszła historia",
      "how it was made": "jak powstało",
      "marketing": "marketing",
      "UE5 gameplay": "rozgrywka UE5",
      "Wait for the MeowOS shell to finish loading.": "Poczekaj, aż MeowOS się załaduje.",
      "Scan Lily's files for anything useful or out of place.": "Przeskanuj pliki Lily w poszukiwaniu czegoś użytecznego lub dziwnego.",
      "Recover the deleted Roomba companion app.": "Odzyskaj usuniętą aplikację Roomba.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "Przenieś cache Roomba do bezpiecznego bufora bez dotykania wiązki.",
      "Repair corrupted Roomba motor data.": "Napraw uszkodzone dane silnika Roomba.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "Otwórz 192.168.1.1 w przeglądarce i zaloguj się do routera.",
      "PIP changed the router password. Find another way through.": "PIP zmienił hasło routera. Znajdź inną drogę.",
      "Demo complete. Review the ALAN project brief.": "Demo ukończone. Zobacz opis projektu ALAN."
    },
    ko: {
      "Language": "언어",
      "Select language": "언어 선택",
      "OBJECTIVE": "목표",
      "YES": "예",
      "NO": "아니오",
      "go": "이동",
      "play": "재생",
      "pause": "일시정지",
      "repeat on": "반복 켜짐",
      "repeat off": "반복 꺼짐",
      "Play music": "음악 재생",
      "Pause music": "음악 일시정지",
      "Enable repeat": "반복 켜기",
      "Disable repeat": "반복 끄기",
      "playing / repeat": "재생 중 / 반복",
      "playing / shuffle": "재생 중 / 셔플",
      "paused": "일시정지됨",
      "current language": "현재 언어",
      "MeowOS": "MeowOS",
      "My Stuff": "내 파일",
      "Trash": "휴지통",
      "Music": "음악",
      "Browser": "브라우저",
      "Roomba App": "Roomba 앱",
      "Roomba Cam": "Roomba 카메라",
      "PIP": "PIP",
      "Files": "파일",
      "Photos": "사진",
      "Notes": "메모",
      "Dev Tools": "개발 도구",
      "chapter select": "챕터 선택",
      "local address": "로컬 주소",
      "go to address": "주소로 이동",
      "ALAN hint": "ALAN 힌트",
      "NO INTERNET / LOCAL NETWORK ONLY": "인터넷 없음 / 로컬 네트워크만",
      "username": "사용자 이름",
      "password": "비밀번호",
      "sign in": "로그인",
      "open boxes": "상자 열기",
      "mark paws": "발자국 표시",
      "mark locks": "잠금 표시",
      "verify": "확인",
      "restart demo": "데모 다시 시작",
      "future story": "미래 이야기",
      "how it was made": "제작 방식",
      "marketing": "마케팅",
      "UE5 gameplay": "UE5 게임플레이",
      "Wait for the MeowOS shell to finish loading.": "MeowOS 셸 로딩이 끝날 때까지 기다린다.",
      "Scan Lily's files for anything useful or out of place.": "Lily의 파일에서 유용하거나 이상한 것을 찾는다.",
      "Recover the deleted Roomba companion app.": "삭제된 Roomba 앱을 복구한다.",
      "Move Roomba cache files into the safe buffer without touching the scanner beam.": "스캐너 빔을 피해서 Roomba 캐시를 안전 버퍼로 옮긴다.",
      "Repair corrupted Roomba motor data.": "손상된 Roomba 모터 데이터를 복구한다.",
      "Open 192.168.1.1 in the browser and sign into the router admin panel.": "브라우저에서 192.168.1.1을 열고 라우터 관리자에 로그인한다.",
      "PIP changed the router password. Find another way through.": "PIP가 라우터 비밀번호를 바꿨다. 다른 길을 찾는다.",
      "Demo complete. Review the ALAN project brief.": "데모 완료. ALAN 프로젝트 브리프를 확인한다."
    }
  };

  const translations = buildTranslations();
  const STORAGE_KEY = "alan.language.v1";
  const textOriginals = new WeakMap();
  const attrOriginals = new WeakMap();
  let currentLanguage = "en";
  let observer = null;
  let translating = false;

  function buildTranslations() {
    const next = {};
    Object.keys(LANGUAGES).forEach((lang) => {
      if (lang === "en") return;

      next[lang] = Object.assign({}, BASE_TRANSLATIONS[lang] || {});
      SHARED_FALLBACK_STRINGS.forEach((text) => {
        if (!Object.prototype.hasOwnProperty.call(next[lang], text)) {
          next[lang][text] = text;
        }
      });
    });
    return next;
  }

  function normalize(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function splitWhitespace(text) {
    const raw = String(text || "");
    const leadingMatch = raw.match(/^\s*/);
    const trailingMatch = raw.match(/\s*$/);
    const leading = leadingMatch ? leadingMatch[0] : "";
    const trailing = trailingMatch ? trailingMatch[0] : "";
    return { leading, core: normalize(raw), trailing };
  }

  function translateText(text, lang = currentLanguage) {
    if (!text || lang === "en") return text;
    const { leading, core, trailing } = splitWhitespace(text);
    if (!core) return text;
    const translated = translations[lang] && translations[lang][core];
    return translated ? `${leading}${translated}${trailing}` : text;
  }

  function translateOutput(text, lang = currentLanguage) {
    const raw = String(text || "");
    if (raw.startsWith("// ")) return `// ${translateText(raw.slice(3), lang)}`;
    return translateText(raw, lang);
  }

  function shouldSkipElement(element) {
    if (!element || element.nodeType !== 1) return false;
    return Boolean(element.closest("script, style, noscript, textarea, code, pre.ascii-preserve, [data-i18n-skip]"));
  }

  function translateTextNode(node) {
    if (!node || !node.nodeValue || !node.parentElement || shouldSkipElement(node.parentElement)) return;

    if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
    const original = textOriginals.get(node);
    const next = currentLanguage === "en" ? original : translateText(original, currentLanguage);
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateAttributes(element) {
    if (!element || element.nodeType !== 1 || shouldSkipElement(element)) return;

    ["aria-label", "title", "placeholder", "alt"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;

      let originals = attrOriginals.get(element);
      if (!originals) {
        originals = {};
        attrOriginals.set(element, originals);
      }
      if (!Object.prototype.hasOwnProperty.call(originals, attribute)) originals[attribute] = element.getAttribute(attribute);

      const original = originals[attribute];
      const next = currentLanguage === "en" ? original : translateText(original, currentLanguage);
      if (element.getAttribute(attribute) !== next) element.setAttribute(attribute, next);
    });
  }

  function translateNode(root = document.body) {
    if (!root || translating) return;
    translating = true;
    try {
      if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root);
      } else if (root.nodeType === Node.ELEMENT_NODE) {
        translateAttributes(root);
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
          acceptNode(node) {
            if (node.nodeType === Node.ELEMENT_NODE && shouldSkipElement(node)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          else if (node.nodeType === Node.ELEMENT_NODE) translateAttributes(node);
        }
      }
    } finally {
      translating = false;
    }
  }

  function populateSelect(select) {
    if (!select) return;
    const selected = currentLanguage;
    select.innerHTML = "";
    Object.entries(LANGUAGES).forEach(([code, label]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = label;
      select.appendChild(option);
    });
    select.value = selected;
  }

  function syncControls() {
    document.querySelectorAll("[data-language-select]").forEach((select) => {
      if (!select.options.length) populateSelect(select);
      select.value = currentLanguage;
    });
    document.querySelectorAll("[data-language-current]").forEach((node) => {
      node.textContent = currentLanguage.toUpperCase();
    });
  }

  function setLanguage(lang, options = {}) {
    const next = LANGUAGES[lang] ? lang : "en";
    currentLanguage = next;
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      // Language persistence is optional.
    }
    syncControls();
    translateNode(document.body);
    if (!options.silent) document.dispatchEvent(new CustomEvent("alan:languagechange", { detail: { language: next } }));
  }

  function startObserver() {
    if (observer || !document.body) return;

    observer = new MutationObserver((mutations) => {
      if (translating || currentLanguage === "en") return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => translateNode(node));
        if (mutation.type === "attributes") translateAttributes(mutation.target);
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-label", "title", "placeholder", "alt"]
    });
  }

  function init() {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    try {
      currentLanguage = requestedLanguage || window.localStorage.getItem(STORAGE_KEY) || "en";
    } catch (error) {
      currentLanguage = requestedLanguage || "en";
    }
    if (!LANGUAGES[currentLanguage]) currentLanguage = "en";

    document.querySelectorAll("[data-language-select]").forEach((select) => {
      populateSelect(select);
      select.addEventListener("change", () => setLanguage(select.value));
    });
    document.querySelectorAll("[data-language-cycle]").forEach((button) => {
      button.addEventListener("click", () => {
        const codes = Object.keys(LANGUAGES);
        const index = codes.indexOf(currentLanguage);
        setLanguage(codes[(index + 1) % codes.length]);
      });
    });
    startObserver();
    setLanguage(currentLanguage, { silent: true });
  }

  window.ALAN_I18N = {
    languages: LANGUAGES,
    getLanguage: () => currentLanguage,
    setLanguage,
    translateText,
    translateOutput,
    translateNode,
    syncControls
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
