# SS Oto Elektrik & Aksesuar — Soner Cam

Mersin / Yenişehir için 12 sayfalı, tamamen Türkçe statik web sitesi. HTML5, Bootstrap 5.3.3, Bootstrap Icons 1.11.3, özel CSS ve Vanilla JavaScript kullanır. React, PHP veya veritabanı yoktur. SEO metinleri, menüler, SSS ve JSON-LD doğrudan HTML dosyalarındadır.

## GitHub Pages'e yayınlama

Proje otomatik GitHub Pages yayınına hazırdır. `.github/workflows/deploy-pages.yml`, her `main` güncellemesinde siteyi oluşturur, yayın yollarını GitHub adresine veya bağlı özel domaine göre ayarlar, statik kontrolleri çalıştırır ve `dist/` klasörünü yayınlar.

Adım adım yükleme, `ssotoelektrik.com.tr` DNS kayıtları ve HTTPS kurulumu için **[GITHUB-YAYINLAMA.md](GITHUB-YAYINLAMA.md)** dosyasını izleyin.

## Açma ve dosyalar

Hazır site **`dist/`** klasöründedir. Bu klasörün içeriği herhangi bir statik hostingin kök dizinine yüklenebilir. Üretimde Node.js veya npm gerekmez. Kökten başlayan adresler kullanıldığından dosyayı çift tıklamak yerine bir HTTP sunucusuyla açın.

Yerel kullanım (Node.js kurulu olmalı):

```sh
npm start
```

Adres: **http://127.0.0.1:4173**. Sunucu yalnızca bu bilgisayardan erişilebilir. Terminali açık bırakın; durdurmak için Ctrl+C kullanın. Alternatif olarak `BASLAT.cmd` dosyasına çift tıklayın.

```text
dist/
  index.html
  mersin/oto-elektrikci/index.html
  hizmetler/7-24-oto-elektrik-yol-yardim/index.html
  hizmetler/oto-elektrik-ariza-tespit/index.html
  hizmetler/oto-aksesuar/index.html
  hizmetler/android-ekran-ve-arac-kamerasi/index.html
  hizmetler/far-ayari-ve-aydinlatma/index.html
  hizmetler/oto-klima/index.html
  iletisim/index.html
  kvkk-aydinlatma-metni/index.html
  gizlilik-politikasi/index.html
  404.html
  assets/css/style.css
  assets/js/main.js
  assets/img/                 SVG kaynaklar ve optimize WebP görseller
  assets/fonts/               Yerel Manrope yazı tipi
  assets/vendor/              Bootstrap ve Bootstrap Icons
  assets/licenses/            Kullanılan üçüncü taraf dosyaların lisansları
  robots.txt
  sitemap.xml
  favicon.svg
  site.webmanifest
scripts/
  build.cjs                   Paylaşılan HTML, SEO ve SVG/WebP üretimi
  content.cjs                 Hizmet ve Mersin sayfalarının metinleri
  legal.cjs                   KVKK ve gizlilik sayfalarının metinleri
  server.cjs                  Yerel statik sunucu
  qa.cjs                      Tarayıcı, bağlantı ve erişilebilirlik kontrolleri
qa/                          Ekran görüntüleri ve kontrol sonuçları
```

## Düzenleme

- **Telefon, adres ve domain:** `scripts/build.cjs` başındaki `BASE`, `PHONE`, `ADDRESS`, `WA`, `MAP`, `EMBED` değişkenlerini; `phone()` içindeki `tel:` bağlantısını ve `business` JSON-LD nesnesini düzenleyin. Telefon hem görünür hem bağlantı formatında tutulur. `dist/assets/js/main.js` içindeki WhatsApp numarası da değişmelidir. SSS içindeki adresi de güncelleyin.
- **İşletme adı / Soner Cam:** `scripts/build.cjs`, `scripts/legal.cjs` ve `dist/assets/js/main.js` dosyalarındaki ilgili metinleri güncelleyin.
- **Hizmet metinleri:** `scripts/content.cjs`. Ana sayfa ve ortak bölümler: `scripts/build.cjs`.
- **Renk, tipografi, mobil düzen:** `dist/assets/css/style.css` başındaki değişkenler ve medya sorguları. Düzenleme sonrası `npm run build` ile kullanılan `style.min.css` dosyasını yenileyin.
- **Menü, form, dönüşüm olayları:** `dist/assets/js/main.js`.
- **Sayfa üretimi:** `npm ci` ardından `npm run build`. Bu işlem 12 HTML dosyasını, SVG/WebP görselleri, favicon, manifest, robots ve sitemap dosyalarını yeniden üretir. CSS ve JS dosyalarını değiştirmez. Elle düzenlenen üretilmiş HTML dosyaları yeniden üretimde üzerine yazılır.

## Gerçek fotoğraflar

Mevcut görseller bu proje için hazırlanmış **temsili teknik illüstrasyonlardır**. İşletmenin gerçek atölyesi, ürün stoğu veya tamamlanmış müşteri işi olarak sunulmaz.

Önerilen fotoğraflar:

1. İşletme tabelası ve dış cephe — açık adresle eşleşen giriş.
2. Atölye ve oto elektrik ölçüm / kontrol alanı.
3. Yapılmış Android ekran ve geri görüş kamerası montajı.
4. Far ayarı / aydınlatma uygulaması.
5. Soner Cam oto cam ve aksesuar uygulaması.

Fotoğrafları kullanım izniyle ekleyin; görünür plakaları ve kişileri gerektiğinde anonimleştirin. WebP veya AVIF tercih edin; galeri için 1320×880, hero için yaklaşık 1320×1100 piksel uygundur. Dosyaları `dist/assets/img/` içine koyun, `scripts/build.cjs` içindeki `hero`, `accessories`, `gallery` görsel yollarını ve alt metinlerini değiştirin. Gerçek fotoğraf eklenen yerde “temsili” etiketini kaldırın. `width` ve `height` değerlerini gerçek en/boy oranıyla eşleştirin. Hero görselinde lazy loading kullanmayın; aşağıdaki görsellerde `loading="lazy"` korunsun.

## WhatsApp formu

Ad soyad, telefon, araç marka/modeli, sorun/hizmet ve onay kutusu zorunludur. Tarayıcı doğrulaması ve ek telefon / boşluk kontrolleri bulunur. Kullanıcı onay kutusunu işaretleyip düğmeye bastığında bilgiler `encodeURIComponent()` ile bir WhatsApp mesajına dönüştürülür. Mesajın gerçekten gönderilmesi için kullanıcı WhatsApp içinde Gönder'e basmalıdır. Site otomatik mesaj göndermez ve form bilgilerini bir veritabanına kaydetmez. Yeni sekme açılmasına tarayıcı izin vermelidir.

## GTM ve Google Ads dönüşümleri

Gerçek hesap bilgileri verilmediğinden **`GTM-XXXXXXX` ve `AW-XXXXXXXXX` açıklamalı yer tutucudur; dış etiketler çalıştırılmaz.** Hayalî kimliklerle Google'a istek gönderilmez. Mevcut dataLayer yalnızca sayfa belleğinde bulunur; site herhangi bir reklam / analitik çerezi oluşturmaz.

1. Geçerli GTM konteyner kodunu `scripts/build.cjs` içindeki `layout()` fonksiyonunun `<head>` bölümünde yer alan GTM yorumuna ekleyin. Google'ın sağladığı noscript parçasının yeri `<body>` açılışından hemen sonradır. Gerekli çerez tercihi ve Consent Mode kurulumu, ölçüm etiketleri etkinleşmeden önce tamamlanmalıdır. Noscript iframe üzerinden tercihleri atlatmayın.
2. GTM içinde gerçek `AW-XXXXXXXXX` kimliğiyle Google etiketini kurun. Google Ads'de gerekli dönüşüm işlemlerini oluşturun; verilen dönüşüm kimliği ve etiketlerini GTM Google Ads dönüşüm etiketlerine girin.
3. Aşağıdaki dört **Özel Etkinlik** tetikleyicisini oluşturun. Aynı etkinlik için ayrıca “Tüm bağlantı tıklamaları” tetikleyicisi eklemeyin; çift sayım olur.

| Etkinlik | Anlamı | Örnek CTA kimliği |
|---|---|---|
| `phone_click` | Telefon bağlantısına basıldı; tamamlanan arama değildir | `hero-phone` |
| `whatsapp_click` | WhatsApp bağlantısına basıldı; gönderilmiş mesaj değildir | `hero-whatsapp` |
| `directions_click` | Yol tarifi bağlantısına basıldı | `hero-directions` |
| `lead_form_submit` | Geçerli ve onaylı formdan WhatsApp taslağı hazırlandı | `contact-form-submit` |

4. `cta_id` ve `page_path` adlı Data Layer değişkenlerini ekleyin. Kimlikler her sayfa içinde benzersizdir; sayfalar arası ayırım için `page_path` kullanılır. Form alanları, telefon, isim ve mesaj metni dataLayer'a eklenmez.
5. Tek bir delege edilmiş tıklama dinleyicisi vardır. İçindeki simgeye veya yazıya basılması aynı CTA için yalnızca bir olay üretir. Form yalnızca `lead_form_submit` üretir, ikinci bir `whatsapp_click` üretmez.
6. Telefon, WhatsApp ve form taslağını aynı potansiyel müşterinin farklı aşamaları olarak değerlendirin. Google Ads’de birincil/ikincil dönüşüm tercihlerini uygun ayarlayın. Telefon tıklamasını tamamlanmış arama, form taslağını kesin satış olarak adlandırmayın.
7. GTM Preview / Tag Assistant ile doğrulayın, ardından gerçek hesapta etiketleri yayınlayın. Siteyi `npm run build` ile yeniden üretin. Bu projede gerçek bir Ads hesabında dönüşüm testi yapılmamıştır.

## SEO ve hosting

- Ana domain `https://ssotoelektrik.com.tr`. Üretim canonical, Open Graph URL ve sitemap bu domaine işaret eder. Alan adı bu çalışma kapsamında bağlanmamıştır.
- `dist/` içeriğini domain köküne yükleyin. `index.html` dosyalarının dizin varsayılanı olarak açılmasını sağlayın. Eksik URL'lerde **gerçek HTTP 404 durumuyla** `404.html` sunun; SPA fallback veya bütün URL'leri ana sayfaya yönlendirme kullanmayın. Yerel sunucu bunu hazır uygular.
- HTTPS etkinleştirin; www / www olmayan varyasyonlardan birini seçip diğerini kalıcı yönlendirin. Ana sayfanın canonical adresi `/` olduğundan gerekirse `/index.html` için `/` yönlendirmesi ekleyin.
- Domain açıldıktan sonra Google Search Console'da domain doğrulaması yapıp `https://ssotoelektrik.com.tr/sitemap.xml` gönderin. 404 sayfası sitemap'e dahil değildir ve noindex taşır.
- GitHub Actions yayını sırasında `SITE_URL` ve `BASE_PATH` değerleri GitHub Pages'ten otomatik alınır. Bu sayede site hem geçici `github.io/depo-adi/` adresinde hem de özel domain kökünde doğru bağlantılarla oluşturulur.
- Google İşletme Profili'ndeki **isim, açık adres ve telefon** bilgilerini sitedeki bilgilerle birebir aynı tutun.
- AutoRepair, WebSite, iç sayfalarda BreadcrumbList ve görünür SSS ile birebir eşleşen FAQPage JSON-LD mevcuttur. Schema eklemek Google'da zengin sonuç garantisi değildir.
- Çalışma saatleri, koordinat, değerlendirme puanı ve fiyat aralığı uydurulmamıştır. “7/24” yalnızca acil yol yardımı ve seyyar oto elektrik için kullanılmıştır.
- Harita dışındaki CSS, simge, font ve görseller yereldir. Bootstrap'ın yalnızca kullanılan kuralları `bootstrap.used.min.css` olarak derlenir; Bootstrap Icons simgeleri SVG olarak HTML'e eklenir, büyük simge fontu indirilmez. Hero görseli `srcset` ile farklı ekran boyutlarına uyarlanır. Hostingde gzip/Brotli etkinleştirilmesi önerilir; yerel sunucu gzip uygular. Google Haritalar, telefon uygulaması ve WhatsApp'ın nihai çalışması kullanıcının bağlantısına ve cihazındaki hizmetlere bağlıdır.

## KVKK ve gizlilik

Metinler mevcut statik form davranışını anlatır; işletmenin resmî veri sorumlusu kimliği/unvanı, gerçek saklama süreleri, hizmet sağlayıcıları ve yurt dışı aktarım düzeni verilmemiştir. Kamuya açık yayından önce bu işletmeye özgü bilgiler `scripts/legal.cjs` içinde gerçek süreçlerle tamamlanmalıdır. “Soner Cam” alt marka adı olarak kullanılmış; kişi adı olduğu varsayılmamıştır. Onay kutusu aydınlatmayı okuma ve WhatsApp yönlendirmesi içindir; genel pazarlama veya her türlü aktarım rızası olarak değerlendirilmemelidir.

Başvurulan resmî kaynaklar: [KVKK Aydınlatma Yükümlülüğü](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-), [Aydınlatma Tebliği](https://www.kvkk.gov.tr/Icerik/4132/aydinlatma-yukumlulugunun-yerine-getirilmesinde-uyulacak-usul-ve-esaslar-hakkinda-teblig). Google Haritalar iframe'i yüklendiğinde üçüncü tarafa teknik bağlantı kurulur; gizlilik sayfasında açıklanır.

## Kontroller

Yerel sunucu açıkken `npm test` çalıştırın. Testler Chrome'u başsız açar; 12 sayfayı 360 / 768 / 1024 / 1440 pikselde, iç linkleri ve varlıkları, benzersiz meta bilgilerini, görünür SSS-schema eşleşmesini, menüyü, form doğrulamasını, URL kodlamasını, tekil dönüşüm olaylarını ve özel 404 yanıtını kontrol eder. axe ile erişilebilirlik taraması yapar. Telefon araması veya WhatsApp mesajı gerçekten gönderilmez; hedefler ve tıklama/form davranışı test ortamında doğrulanır.

Görsel kontroller `qa/home-*.png`, ayrıntılı sonuç `qa/report.json`, performans ölçümleri `qa/lighthouse-*.json` dosyalarında tutulur. Lighthouse sonuçları cihaz, ağ, sunucu ve üçüncü taraf harita yanıtına göre değişebilir.
