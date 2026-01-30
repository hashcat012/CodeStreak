export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Challenge {
  instruction: string;
  expectedOutput: string;
  hint: string;
  starterCode: string;
}

export interface LessonContent {
  theory: string;
  codeExamples: { title: string; code: string; explanation: string }[];
  keyPoints: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  content: LessonContent;
  quiz: Quiz[];
  challenges: Challenge[];
}

export interface Language {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  totalLessons: number;
  lessons: Lesson[];
}

// Helper function to generate 50 lessons for each language
function generatePythonLessons(): Lesson[] {
  const lessons: Lesson[] = [
    {
      id: "1",
      title: "Python'a Giriş",
      description: "Python nedir ve neden öğrenmeliyiz?",
      duration: "15 dk",
      xp: 50,
      content: {
        theory: `Python, 1991 yılında Guido van Rossum tarafından geliştirilen, yüksek seviyeli, yorumlanan bir programlama dilidir. Adını Monty Python adlı İngiliz komedi grubundan almıştır.

Python'un en önemli özellikleri:

1. **Okunabilirlik**: Python, İngilizce'ye benzer sözdizimi ile kod yazmayı kolaylaştırır. Girinti (indentation) zorunluluğu sayesinde kodlar düzenli ve okunabilir olur.

2. **Çok Yönlülük**: Web geliştirme, veri bilimi, yapay zeka, otomasyon, oyun geliştirme gibi birçok alanda kullanılabilir.

3. **Geniş Kütüphane Desteği**: NumPy, Pandas, TensorFlow, Django gibi binlerce hazır kütüphane mevcuttur.

4. **Platform Bağımsızlık**: Windows, macOS, Linux gibi farklı işletim sistemlerinde çalışabilir.

5. **Topluluk Desteği**: Dünya genelinde milyonlarca Python geliştiricisi vardır ve sürekli büyüyen bir topluluk desteğine sahiptir.

Python'un kullanım alanları:
- Web Geliştirme (Django, Flask)
- Veri Bilimi ve Analiz (Pandas, NumPy)
- Makine Öğrenimi (TensorFlow, PyTorch)
- Otomasyon ve Scripting
- Oyun Geliştirme (Pygame)
- Masaüstü Uygulamalar (Tkinter, PyQt)`,
        codeExamples: [
          {
            title: "İlk Python Programı",
            code: `# Bu bir yorum satırıdır
print("Merhaba Dünya!")
print("Python öğrenmeye başladım!")`,
            explanation: "print() fonksiyonu ekrana metin yazdırmak için kullanılır. Tırnak içindeki metinler 'string' olarak adlandırılır."
          },
          {
            title: "Basit Hesaplama",
            code: `# Python hesap makinesi gibi kullanılabilir
print(5 + 3)    # Toplama: 8
print(10 - 4)   # Çıkarma: 6
print(6 * 7)    # Çarpma: 42
print(15 / 3)   # Bölme: 5.0`,
            explanation: "Python doğrudan matematiksel işlemleri yapabilir. Bölme işlemi her zaman ondalıklı sonuç verir."
          },
          {
            title: "Çoklu Satır Yazdırma",
            code: `print("Satır 1")
print("Satır 2")
print("Satır 3")

# Veya tek print ile:
print("""Bu çok
satırlı bir
metindir.""")`,
            explanation: "Üç tırnak (triple quotes) ile çok satırlı metinler yazılabilir."
          }
        ],
        keyPoints: [
          "Python yüksek seviyeli, yorumlanan bir programlama dilidir",
          "Okunabilir ve öğrenmesi kolay sözdizimi vardır",
          "print() fonksiyonu ekrana çıktı vermek için kullanılır",
          "# işareti ile yorum satırı oluşturulur",
          "Python büyük-küçük harf duyarlıdır (case-sensitive)"
        ]
      },
      quiz: [
        {
          question: "Python hangi yılda geliştirilmiştir?",
          options: ["1985", "1991", "2000", "1995"],
          correctAnswer: 1
        },
        {
          question: "Ekrana 'Merhaba' yazdırmak için hangi fonksiyon kullanılır?",
          options: ["echo('Merhaba')", "print('Merhaba')", "write('Merhaba')", "console.log('Merhaba')"],
          correctAnswer: 1
        },
        {
          question: "Python'da yorum satırı hangi karakterle başlar?",
          options: ["//", "/*", "#", "--"],
          correctAnswer: 2
        },
        {
          question: "Python'un adı nereden gelmektedir?",
          options: ["Bir yılan türünden", "Monty Python komedi grubundan", "Geliştiricinin soyadından", "Bir şehir isminden"],
          correctAnswer: 1
        },
        {
          question: "Aşağıdakilerden hangisi Python'un özelliklerinden değildir?",
          options: ["Platform bağımsızlık", "Düşük seviyeli dil olması", "Geniş kütüphane desteği", "Okunabilir sözdizimi"],
          correctAnswer: 1
        }
      ],
      challenges: [
        {
          instruction: "Ekrana 'Python öğreniyorum!' yazdıran bir program yazın.",
          expectedOutput: "Python öğreniyorum!",
          hint: "print() fonksiyonunu kullanın ve metni tırnak içinde yazın.",
          starterCode: "# Kodunuzu buraya yazın\n"
        },
        {
          instruction: "25 ile 17'nin toplamını ekrana yazdırın.",
          expectedOutput: "42",
          hint: "print() içinde toplama işlemi yapabilirsiniz: print(sayı1 + sayı2)",
          starterCode: "# 25 + 17 işleminin sonucunu yazdırın\n"
        }
      ]
    },
    {
      id: "2",
      title: "Değişkenler",
      description: "Veri depolama ve değişken türleri",
      duration: "20 dk",
      xp: 75,
      content: {
        theory: `Değişkenler, programlama dillerinde verileri saklamak için kullanılan isimlendirilmiş bellek alanlarıdır. Python'da değişken tanımlamak çok basittir.

**Değişken Tanımlama Kuralları:**
1. Değişken isimleri harf veya alt çizgi (_) ile başlamalıdır
2. Rakamla başlayamaz ama içerebilir
3. Boşluk içeremez (alt çizgi kullanılabilir)
4. Python'un anahtar kelimeleri (if, for, while vb.) kullanılamaz
5. Büyük-küçük harf duyarlıdır (name ve Name farklı değişkenlerdir)

**İyi İsimlendirme Pratikleri:**
- Anlamlı isimler kullanın: x yerine yas, sayi
- snake_case kullanın: kullanici_adi, toplam_fiyat
- Kısa ve açıklayıcı olsun

**Değişken Türleri:**
Python dinamik tipli bir dildir, yani değişken türünü belirtmenize gerek yoktur. Python otomatik olarak türü belirler.`,
        codeExamples: [
          {
            title: "Değişken Tanımlama",
            code: `# String (metin) değişken
isim = "Ahmet"
soyisim = 'Yılmaz'

# Integer (tam sayı) değişken
yas = 25
yil = 2024

# Float (ondalıklı sayı) değişken
boy = 1.75
sicaklik = 36.6

# Boolean (mantıksal) değişken
ogrenci_mi = True
mezun_mu = False`,
            explanation: "Python'da değişken türünü belirtmeye gerek yoktur. Atanan değere göre tür otomatik belirlenir."
          },
          {
            title: "Değişkenleri Kullanma",
            code: `isim = "Elif"
yas = 22

print("Merhaba, ben " + isim)
print("Yaşım:", yas)

# Değişken değerini değiştirme
yas = 23
print("Yeni yaşım:", yas)`,
            explanation: "Değişkenler print() içinde kullanılabilir. Virgül ile farklı türleri birleştirebilirsiniz."
          },
          {
            title: "Çoklu Değişken Atama",
            code: `# Aynı anda birden fazla değişken
a, b, c = 1, 2, 3
print(a, b, c)  # 1 2 3

# Aynı değeri birden fazla değişkene
x = y = z = 0
print(x, y, z)  # 0 0 0

# Değişken değerlerini takas etme
a, b = b, a
print(a, b)  # 2 1`,
            explanation: "Python'da çoklu atama ile kod daha kısa ve okunabilir yazılabilir."
          }
        ],
        keyPoints: [
          "Değişkenler = işareti ile tanımlanır",
          "Python dinamik tipli bir dildir",
          "Değişken isimleri anlamlı ve açıklayıcı olmalıdır",
          "snake_case isimlendirme önerilir",
          "Değişken değerleri sonradan değiştirilebilir"
        ]
      },
      quiz: [
        {
          question: "Aşağıdaki değişken tanımlamalarından hangisi geçerlidir?",
          options: ["2sayi = 10", "sayi 2 = 10", "sayi_2 = 10", "sayi-2 = 10"],
          correctAnswer: 2
        },
        {
          question: "Python'da 'isim' ve 'Isim' aynı değişken midir?",
          options: ["Evet, aynıdır", "Hayır, farklıdır", "Hata verir", "Duruma göre değişir"],
          correctAnswer: 1
        },
        {
          question: "x = 5.5 tanımlamasında x'in türü nedir?",
          options: ["int", "str", "float", "bool"],
          correctAnswer: 2
        },
        {
          question: "a = True ifadesinde a'nın türü nedir?",
          options: ["string", "integer", "float", "boolean"],
          correctAnswer: 3
        },
        {
          question: "Aşağıdakilerden hangisi geçerli bir değişken ismi DEĞİLDİR?",
          options: ["_private", "myVar", "for", "name123"],
          correctAnswer: 2
        }
      ],
      challenges: [
        {
          instruction: "Kendi adınızı 'ad' değişkenine, yaşınızı 'yas' değişkenine atayın ve her ikisini de yazdırın.",
          expectedOutput: "Ad: [adınız]\nYaş: [yaşınız]",
          hint: "İki değişken tanımlayın ve print() ile yazdırın.",
          starterCode: "# Değişkenlerinizi tanımlayın\nad = \nyas = \n\n# Yazdırın\nprint(\"Ad:\", ad)\nprint(\"Yaş:\", yas)"
        },
        {
          instruction: "a = 10 ve b = 20 değişkenlerinin değerlerini takas edin ve sonucu yazdırın.",
          expectedOutput: "a = 20, b = 10",
          hint: "Python'da a, b = b, a şeklinde takas yapılabilir.",
          starterCode: "a = 10\nb = 20\n\n# Değerleri takas edin\n\nprint(f\"a = {a}, b = {b}\")"
        }
      ]
    },
    {
      id: "3",
      title: "Veri Tipleri",
      description: "String, int, float ve boolean",
      duration: "25 dk",
      xp: 75,
      content: {
        theory: `Python'da her değerin bir tipi vardır. Temel veri tipleri şunlardır:

**1. String (str) - Metin:**
Metinsel verileri saklar. Tek tırnak ('') veya çift tırnak ("") ile tanımlanır.

**2. Integer (int) - Tam Sayı:**
Ondalık kısmı olmayan tam sayıları saklar. Pozitif, negatif veya sıfır olabilir.

**3. Float - Ondalıklı Sayı:**
Ondalık kısmı olan sayıları saklar. Bilimsel hesaplamalarda kullanılır.

**4. Boolean (bool) - Mantıksal:**
True veya False değerlerini alır. Koşullu ifadelerde kullanılır.

**5. None - Boş Değer:**
Değerin olmadığını belirtir. Henüz atanmamış değişkenler için kullanılır.

**type() Fonksiyonu:**
Bir değişkenin tipini öğrenmek için type() fonksiyonu kullanılır.`,
        codeExamples: [
          {
            title: "Veri Tiplerini Tanıma",
            code: `# String
metin = "Merhaba Python"
print(type(metin))  # <class 'str'>

# Integer
sayi = 42
print(type(sayi))   # <class 'int'>

# Float
ondalik = 3.14
print(type(ondalik)) # <class 'float'>

# Boolean
dogru = True
yanlis = False
print(type(dogru))  # <class 'bool'>

# None
bos = None
print(type(bos))    # <class 'NoneType'>`,
            explanation: "type() fonksiyonu değişkenin veri tipini döndürür."
          },
          {
            title: "String İşlemleri",
            code: `isim = "Python"

# String uzunluğu
print(len(isim))  # 6

# Büyük-küçük harf
print(isim.upper())  # PYTHON
print(isim.lower())  # python

# String birleştirme
selam = "Merhaba " + isim
print(selam)  # Merhaba Python

# String çoğaltma
print("=" * 20)  # ====================

# Karakter erişimi
print(isim[0])   # P (ilk karakter)
print(isim[-1])  # n (son karakter)`,
            explanation: "Stringler üzerinde birçok işlem yapılabilir. İndeksleme 0'dan başlar."
          },
          {
            title: "Tip Dönüşümleri",
            code: `# String'den Integer'a
sayi_str = "123"
sayi_int = int(sayi_str)
print(sayi_int + 7)  # 130

# Integer'dan String'e
yas = 25
yas_str = str(yas)
print("Yaşım: " + yas_str)

# Float dönüşümleri
x = 10
print(float(x))  # 10.0

y = 3.7
print(int(y))    # 3 (ondalık kısım atılır)`,
            explanation: "int(), str(), float() fonksiyonları ile tipler arası dönüşüm yapılır."
          }
        ],
        keyPoints: [
          "String: Metin veriler için ('metin' veya \"metin\")",
          "Integer: Tam sayılar için (42, -10, 0)",
          "Float: Ondalıklı sayılar için (3.14, -2.5)",
          "Boolean: True veya False değerleri",
          "type() ile veri tipi öğrenilir",
          "int(), str(), float() ile tip dönüşümü yapılır"
        ]
      },
      quiz: [
        {
          question: "\"123\" ifadesinin veri tipi nedir?",
          options: ["int", "float", "str", "bool"],
          correctAnswer: 2
        },
        {
          question: "int(\"45\") işleminin sonucu nedir?",
          options: ["\"45\"", "45", "45.0", "Hata verir"],
          correctAnswer: 1
        },
        {
          question: "int(7.9) işleminin sonucu nedir?",
          options: ["7", "8", "7.9", "7.0"],
          correctAnswer: 0
        },
        {
          question: "len(\"Python\") işleminin sonucu nedir?",
          options: ["5", "6", "7", "Hata verir"],
          correctAnswer: 1
        },
        {
          question: "\"abc\"[0] ifadesinin sonucu nedir?",
          options: ["abc", "a", "b", "c"],
          correctAnswer: 1
        }
      ],
      challenges: [
        {
          instruction: "Kullanıcının yaşını string olarak alın ('25' gibi), integer'a çevirin ve 5 yıl sonraki yaşını hesaplayıp yazdırın.",
          expectedOutput: "5 yıl sonra yaşınız: 30",
          hint: "int() fonksiyonu ile string'i sayıya çevirin, sonra 5 ekleyin.",
          starterCode: "yas_str = \"25\"\n\n# String'i integer'a çevirin ve 5 ekleyin\n\nprint(\"5 yıl sonra yaşınız:\", sonuc)"
        },
        {
          instruction: "Bir string değişkeninin uzunluğunu bulun ve 'Bu metnin uzunluğu: X karakter' şeklinde yazdırın.",
          expectedOutput: "Bu metnin uzunluğu: 13 karakter",
          hint: "len() fonksiyonu string uzunluğunu verir.",
          starterCode: "metin = \"Merhaba Dünya\"\n\n# Uzunluğu bulun ve yazdırın\n"
        }
      ]
    }
  ];

  // Generate remaining lessons (4-50)
  const additionalTopics = [
    { id: "4", title: "Operatörler", description: "Matematiksel ve mantıksal operatörler" },
    { id: "5", title: "String Metodları", description: "Metin işleme fonksiyonları" },
    { id: "6", title: "Koşullar - if", description: "if ifadesi ile karar yapıları" },
    { id: "7", title: "Koşullar - elif ve else", description: "Çoklu koşul kontrolü" },
    { id: "8", title: "For Döngüsü", description: "Tekrarlı işlemler için for" },
    { id: "9", title: "While Döngüsü", description: "Koşullu tekrarlama" },
    { id: "10", title: "break ve continue", description: "Döngü kontrol ifadeleri" },
    { id: "11", title: "Listeler - Temel", description: "Liste oluşturma ve erişim" },
    { id: "12", title: "Liste Metodları", description: "append, remove, sort ve daha fazlası" },
    { id: "13", title: "Liste Dilimleme", description: "Slicing ile liste parçalama" },
    { id: "14", title: "Tuple", description: "Değiştirilemez listeler" },
    { id: "15", title: "Sözlükler - Temel", description: "Key-value yapıları" },
    { id: "16", title: "Sözlük Metodları", description: "get, keys, values, items" },
    { id: "17", title: "Set (Küme)", description: "Benzersiz elemanlar koleksiyonu" },
    { id: "18", title: "Fonksiyonlar - Temel", description: "def ile fonksiyon tanımlama" },
    { id: "19", title: "Fonksiyon Parametreleri", description: "Argümanlar ve varsayılan değerler" },
    { id: "20", title: "return İfadesi", description: "Fonksiyondan değer döndürme" },
    { id: "21", title: "*args ve **kwargs", description: "Esnek parametre alma" },
    { id: "22", title: "Lambda Fonksiyonları", description: "Tek satırlık anonim fonksiyonlar" },
    { id: "23", title: "List Comprehension", description: "Tek satırda liste oluşturma" },
    { id: "24", title: "Dictionary Comprehension", description: "Tek satırda sözlük oluşturma" },
    { id: "25", title: "Dosya İşlemleri - Okuma", description: "Dosyadan veri okuma" },
    { id: "26", title: "Dosya İşlemleri - Yazma", description: "Dosyaya veri yazma" },
    { id: "27", title: "Hata Yönetimi - try/except", description: "Hataları yakalama" },
    { id: "28", title: "Hata Türleri", description: "Farklı exception tipleri" },
    { id: "29", title: "raise ve Custom Exceptions", description: "Kendi hatalarınızı oluşturma" },
    { id: "30", title: "Modüller", description: "import ile modül kullanımı" },
    { id: "31", title: "Kendi Modülünüzü Oluşturma", description: "Kod organizasyonu" },
    { id: "32", title: "pip ve Paket Yönetimi", description: "Harici kütüphane kurulumu" },
    { id: "33", title: "OOP - Sınıflar", description: "class ile nesne oluşturma" },
    { id: "34", title: "OOP - __init__ Metodu", description: "Constructor kullanımı" },
    { id: "35", title: "OOP - Metodlar", description: "Sınıf içi fonksiyonlar" },
    { id: "36", title: "OOP - Kalıtım", description: "Inheritance ile kod paylaşımı" },
    { id: "37", title: "OOP - Encapsulation", description: "Private ve public özellikler" },
    { id: "38", title: "OOP - Polymorphism", description: "Çok biçimlilik" },
    { id: "39", title: "Decorators", description: "Fonksiyon sarmalayıcıları" },
    { id: "40", title: "Generators", description: "yield ile lazy evaluation" },
    { id: "41", title: "map() Fonksiyonu", description: "Liste üzerinde dönüşüm" },
    { id: "42", title: "filter() Fonksiyonu", description: "Liste filtreleme" },
    { id: "43", title: "reduce() Fonksiyonu", description: "Liste indirgeme" },
    { id: "44", title: "Regular Expressions", description: "Metin deseni eşleştirme" },
    { id: "45", title: "datetime Modülü", description: "Tarih ve saat işlemleri" },
    { id: "46", title: "JSON İşlemleri", description: "JSON okuma ve yazma" },
    { id: "47", title: "API İstekleri", description: "requests modülü ile HTTP" },
    { id: "48", title: "Virtual Environments", description: "Proje izolasyonu" },
    { id: "49", title: "Unit Testing", description: "Test yazma temelleri" },
    { id: "50", title: "Proje: Todo Uygulaması", description: "Öğrendiklerinizi birleştirin" }
  ];

  for (const topic of additionalTopics) {
    lessons.push({
      ...topic,
      duration: `${15 + Math.floor(Math.random() * 15)} dk`,
      xp: 50 + Math.floor(Math.random() * 100),
      content: {
        theory: `Bu ders "${topic.title}" konusunu kapsamlı şekilde ele almaktadır.\n\n${topic.description}\n\nBu konuyu öğrendikten sonra Python becerileriniz bir üst seviyeye çıkacaktır. Örnekleri dikkatle inceleyin ve kendiniz de deneyerek pekiştirin.`,
        codeExamples: [
          {
            title: "Örnek 1",
            code: `# ${topic.title} örneği\nprint("${topic.title} konusu")`,
            explanation: "Bu örnek konunun temel kullanımını göstermektedir."
          }
        ],
        keyPoints: [
          `${topic.title} Python'da önemli bir konudur`,
          "Pratik yaparak pekiştirin",
          "Gerçek projelerde kullanım alanlarını keşfedin"
        ]
      },
      quiz: [
        {
          question: `${topic.title} hakkında aşağıdakilerden hangisi doğrudur?`,
          options: ["Seçenek A", "Seçenek B", "Doğru cevap", "Seçenek D"],
          correctAnswer: 2
        },
        {
          question: "Bu konuyla ilgili ikinci soru?",
          options: ["A şıkkı", "B şıkkı", "C şıkkı", "Doğru şık"],
          correctAnswer: 3
        },
        {
          question: "Üçüncü quiz sorusu?",
          options: ["Doğru", "Yanlış 1", "Yanlış 2", "Yanlış 3"],
          correctAnswer: 0
        },
        {
          question: "Dördüncü soru?",
          options: ["Hayır", "Evet", "Belki", "Doğru cevap bu"],
          correctAnswer: 3
        },
        {
          question: "Son quiz sorusu?",
          options: ["Seçenek 1", "Doğru seçenek", "Seçenek 3", "Seçenek 4"],
          correctAnswer: 1
        }
      ],
      challenges: [
        {
          instruction: `${topic.title} konusunu kullanarak basit bir program yazın.`,
          expectedOutput: "Beklenen çıktı",
          hint: "İpucu: Örnekleri inceleyin.",
          starterCode: "# Kodunuzu buraya yazın\n"
        },
        {
          instruction: "İkinci challenge: Daha karmaşık bir örnek yapın.",
          expectedOutput: "İkinci çıktı",
          hint: "Derste öğrendiklerinizi birleştirin.",
          starterCode: "# Challenge 2\n"
        }
      ]
    });
  }

  return lessons;
}

function generateJavaScriptLessons(): Lesson[] {
  const baseLessons: Lesson[] = [
    {
      id: "1",
      title: "JavaScript'e Giriş",
      description: "JavaScript nedir ve nerelerde kullanılır?",
      duration: "15 dk",
      xp: 50,
      content: {
        theory: `JavaScript, web'in programlama dilidir. 1995 yılında Brendan Eich tarafından sadece 10 günde geliştirilmiştir.

**JavaScript'in Özellikleri:**
1. **Dinamik Tipli**: Değişken türleri çalışma zamanında belirlenir
2. **Yorumlanan Dil**: Derleme gerektirmez, tarayıcıda çalışır
3. **Çok Paradigmalı**: Nesne yönelimli, fonksiyonel programlamayı destekler
4. **Event-Driven**: Olaylara tepki veren programlar yazılabilir

**Kullanım Alanları:**
- Frontend Web Geliştirme
- Backend (Node.js)
- Mobil Uygulama (React Native)
- Masaüstü Uygulamalar (Electron)
- Oyun Geliştirme`,
        codeExamples: [
          {
            title: "İlk JavaScript Kodu",
            code: `// Konsola yazdırma
console.log("Merhaba JavaScript!");

// Alert ile popup
alert("Hoş geldiniz!");

// Değişken tanımlama
let isim = "Ahmet";
console.log("Merhaba " + isim);`,
            explanation: "console.log() geliştirici konsoluna, alert() popup olarak mesaj gösterir."
          }
        ],
        keyPoints: [
          "JavaScript web'in programlama dilidir",
          "console.log() ile konsola yazdırılır",
          "Tarayıcıda çalışır, derleme gerektirmez",
          "Frontend ve backend'de kullanılabilir"
        ]
      },
      quiz: [
        {
          question: "JavaScript hangi yılda geliştirilmiştir?",
          options: ["1990", "1995", "2000", "2005"],
          correctAnswer: 1
        },
        {
          question: "Konsola mesaj yazdırmak için hangi fonksiyon kullanılır?",
          options: ["print()", "echo()", "console.log()", "write()"],
          correctAnswer: 2
        },
        {
          question: "JavaScript'i kim geliştirmiştir?",
          options: ["James Gosling", "Brendan Eich", "Guido van Rossum", "Dennis Ritchie"],
          correctAnswer: 1
        },
        {
          question: "Aşağıdakilerden hangisi JavaScript'in kullanım alanı değildir?",
          options: ["Web geliştirme", "Mobil uygulama", "İşletim sistemi çekirdeği", "Oyun geliştirme"],
          correctAnswer: 2
        },
        {
          question: "JavaScript hangi tip bir dildir?",
          options: ["Statik tipli", "Dinamik tipli", "Tip içermeyen", "Sadece string tipli"],
          correctAnswer: 1
        }
      ],
      challenges: [
        {
          instruction: "Konsola 'JavaScript öğreniyorum!' yazdırın.",
          expectedOutput: "JavaScript öğreniyorum!",
          hint: "console.log() fonksiyonunu kullanın.",
          starterCode: "// Mesajınızı yazdırın\n"
        },
        {
          instruction: "İki sayıyı toplayıp sonucu konsola yazdırın.",
          expectedOutput: "15",
          hint: "console.log(10 + 5) şeklinde yazabilirsiniz.",
          starterCode: "// 10 + 5 işlemini yapın\n"
        }
      ]
    }
  ];

  // Generate remaining lessons
  for (let i = 2; i <= 50; i++) {
    baseLessons.push({
      id: String(i),
      title: `JavaScript Ders ${i}`,
      description: `JavaScript konusu ${i}`,
      duration: `${15 + Math.floor(Math.random() * 15)} dk`,
      xp: 50 + Math.floor(Math.random() * 100),
      content: {
        theory: `Bu ders JavaScript'in ${i}. konusunu kapsar.`,
        codeExamples: [{ title: "Örnek", code: "console.log('Örnek');", explanation: "Temel örnek" }],
        keyPoints: ["Önemli nokta 1", "Önemli nokta 2"]
      },
      quiz: [
        { question: "Soru 1?", options: ["A", "B", "C", "D"], correctAnswer: 0 },
        { question: "Soru 2?", options: ["A", "B", "C", "D"], correctAnswer: 1 },
        { question: "Soru 3?", options: ["A", "B", "C", "D"], correctAnswer: 2 },
        { question: "Soru 4?", options: ["A", "B", "C", "D"], correctAnswer: 0 },
        { question: "Soru 5?", options: ["A", "B", "C", "D"], correctAnswer: 3 }
      ],
      challenges: [
        { instruction: "Challenge 1", expectedOutput: "Çıktı 1", hint: "İpucu", starterCode: "// Kod\n" },
        { instruction: "Challenge 2", expectedOutput: "Çıktı 2", hint: "İpucu", starterCode: "// Kod\n" }
      ]
    });
  }

  return baseLessons;
}

// Generate simple lessons for other languages
function generateGenericLessons(languageName: string): Lesson[] {
  const lessons: Lesson[] = [];
  
  for (let i = 1; i <= 50; i++) {
    lessons.push({
      id: String(i),
      title: `${languageName} Ders ${i}`,
      description: `${languageName} programlama konusu ${i}`,
      duration: `${15 + Math.floor(Math.random() * 15)} dk`,
      xp: 50 + Math.floor(Math.random() * 100),
      content: {
        theory: `Bu ders ${languageName} programlama dilinin ${i}. konusunu kapsamlı şekilde ele almaktadır.\n\nBu konuyu öğrendikten sonra ${languageName} becerileriniz bir üst seviyeye çıkacaktır.`,
        codeExamples: [
          {
            title: "Temel Örnek",
            code: `// ${languageName} örneği\n// Ders ${i} kodu`,
            explanation: "Bu örnek konunun temel kullanımını göstermektedir."
          }
        ],
        keyPoints: [
          `${languageName} dilinde bu konu önemlidir`,
          "Pratik yaparak pekiştirin",
          "Gerçek projelerde kullanım alanlarını keşfedin"
        ]
      },
      quiz: [
        { question: `${languageName} Ders ${i} - Soru 1?`, options: ["Doğru", "Yanlış A", "Yanlış B", "Yanlış C"], correctAnswer: 0 },
        { question: `${languageName} Ders ${i} - Soru 2?`, options: ["Yanlış", "Doğru", "Yanlış", "Yanlış"], correctAnswer: 1 },
        { question: `${languageName} Ders ${i} - Soru 3?`, options: ["A", "B", "Doğru", "D"], correctAnswer: 2 },
        { question: `${languageName} Ders ${i} - Soru 4?`, options: ["X", "Y", "Z", "Doğru"], correctAnswer: 3 },
        { question: `${languageName} Ders ${i} - Soru 5?`, options: ["Doğru cevap", "B", "C", "D"], correctAnswer: 0 }
      ],
      challenges: [
        {
          instruction: `${languageName} kullanarak basit bir program yazın.`,
          expectedOutput: "Beklenen çıktı",
          hint: "Örnekleri inceleyin.",
          starterCode: "// Kodunuzu buraya yazın\n"
        },
        {
          instruction: `${languageName} ile daha karmaşık bir örnek yapın.`,
          expectedOutput: "İkinci çıktı",
          hint: "Derste öğrendiklerinizi birleştirin.",
          starterCode: "// Challenge 2\n"
        }
      ]
    });
  }
  
  return lessons;
}

export const languages: Language[] = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "#3776AB",
    description: "Başlangıç için mükemmel, çok yönlü programlama dili",
    totalLessons: 50,
    lessons: generatePythonLessons()
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "📜",
    color: "#F7DF1E",
    description: "Web'in programlama dili, frontend ve backend",
    totalLessons: 50,
    lessons: generateJavaScriptLessons()
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "📘",
    color: "#3178C6",
    description: "JavaScript'in tip güvenli versiyonu",
    totalLessons: 50,
    lessons: generateGenericLessons("TypeScript")
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    color: "#ED8B00",
    description: "Kurumsal uygulamalar için güçlü dil",
    totalLessons: 50,
    lessons: generateGenericLessons("Java")
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚡",
    color: "#00599C",
    description: "Yüksek performanslı sistem programlama",
    totalLessons: 50,
    lessons: generateGenericLessons("C++")
  },
  {
    id: "csharp",
    name: "C#",
    icon: "🎯",
    color: "#512BD4",
    description: "Microsoft'un güçlü programlama dili",
    totalLessons: 50,
    lessons: generateGenericLessons("C#")
  },
  {
    id: "go",
    name: "Go",
    icon: "🐹",
    color: "#00ADD8",
    description: "Google'ın modern sistem programlama dili",
    totalLessons: 50,
    lessons: generateGenericLessons("Go")
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    color: "#CE422B",
    description: "Güvenli ve hızlı sistem programlama",
    totalLessons: 50,
    lessons: generateGenericLessons("Rust")
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    color: "#FA7343",
    description: "Apple platformları için modern dil",
    totalLessons: 50,
    lessons: generateGenericLessons("Swift")
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "📱",
    color: "#7F52FF",
    description: "Modern Android geliştirme dili",
    totalLessons: 50,
    lessons: generateGenericLessons("Kotlin")
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    color: "#777BB4",
    description: "Web geliştirme için sunucu taraflı dil",
    totalLessons: 50,
    lessons: generateGenericLessons("PHP")
  },
  {
    id: "ruby",
    name: "Ruby",
    icon: "💎",
    color: "#CC342D",
    description: "Elegant ve üretken programlama dili",
    totalLessons: 50,
    lessons: generateGenericLessons("Ruby")
  },
  {
    id: "sql",
    name: "SQL",
    icon: "🗄️",
    color: "#336791",
    description: "Veritabanı sorgulama dili",
    totalLessons: 50,
    lessons: generateGenericLessons("SQL")
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    icon: "🎨",
    color: "#E34F26",
    description: "Web sayfalarının temeli",
    totalLessons: 50,
    lessons: generateGenericLessons("HTML & CSS")
  },
  {
    id: "react",
    name: "React",
    icon: "⚛️",
    color: "#61DAFB",
    description: "Facebook'un UI kütüphanesi",
    totalLessons: 50,
    lessons: generateGenericLessons("React")
  },
  {
    id: "vue",
    name: "Vue.js",
    icon: "💚",
    color: "#4FC08D",
    description: "Progressive JavaScript framework",
    totalLessons: 50,
    lessons: generateGenericLessons("Vue.js")
  },
  {
    id: "angular",
    name: "Angular",
    icon: "🅰️",
    color: "#DD0031",
    description: "Google'ın enterprise framework'ü",
    totalLessons: 50,
    lessons: generateGenericLessons("Angular")
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "🟢",
    color: "#339933",
    description: "JavaScript runtime for backend",
    totalLessons: 50,
    lessons: generateGenericLessons("Node.js")
  },
  {
    id: "django",
    name: "Django",
    icon: "🎸",
    color: "#092E20",
    description: "Python web framework",
    totalLessons: 50,
    lessons: generateGenericLessons("Django")
  },
  {
    id: "flutter",
    name: "Flutter",
    icon: "🦋",
    color: "#02569B",
    description: "Cross-platform mobil geliştirme",
    totalLessons: 50,
    lessons: generateGenericLessons("Flutter")
  }
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find(lang => lang.id === id);
}

export function getLessonById(languageId: string, lessonId: string): Lesson | undefined {
  const language = getLanguageById(languageId);
  return language?.lessons.find(lesson => lesson.id === lessonId);
}
