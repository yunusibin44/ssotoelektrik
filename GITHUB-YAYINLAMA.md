# GitHub Pages ve domain kurulumu

Bu proje GitHub'a yüklendiğinde `main` dalındaki her değişiklikte siteyi otomatik oluşturup GitHub Pages'e yayınlayacak şekilde hazırdır. Alan adı eklenmeden önce GitHub'ın geçici proje adresinde, alan adı eklendikten sonra da domain kökünde doğru yolları otomatik üretir.

## 1. GitHub'a yükleme

1. GitHub'da **New repository** ile örneğin `ss-oto-elektrik` adında boş bir depo oluşturun.
2. Bu ZIP'i bilgisayarınızda açın.
3. ZIP'ten çıkan klasörün kendisini değil, içindeki tüm dosya ve klasörleri deponun köküne yükleyin. `.github` klasörünün de yüklendiğini kontrol edin.
4. Değişiklikleri `main` dalına kaydedin.
5. Depoda **Settings → Pages → Build and deployment → Source** bölümünden **GitHub Actions** seçin.
6. **Actions** sekmesinde “GitHub Pages'te yayınla” çalışmasını açın. İlk yükleme Pages etkinleşmeden önce hata verdiyse **Run workflow** ile bir kez yeniden çalıştırın.

Başarılı çalışmanın sonunda adres `https://GITHUB-KULLANICI-ADINIZ.github.io/ss-oto-elektrik/` biçiminde olur. Depo adı farklıysa son bölüm de farklı olur.

## 2. `ssotoelektrik.com.tr` domainini bağlama

Domaini satın aldıktan sonra önce GitHub hesabınızda **Settings → Pages** üzerinden domain sahipliğini doğrulamanız önerilir.

Ardından depo içinde:

1. **Settings → Pages → Custom domain** alanına `ssotoelektrik.com.tr` yazıp **Save** seçin.
2. Domain firmasının DNS panelinde aşağıdaki dört kaydı ekleyin:

| Tür | Ad/Host | Değer |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

3. `www` adresinin de çalışması için şu kaydı ekleyin:

| Tür | Ad/Host | Değer |
| --- | --- | --- |
| CNAME | `www` | `GITHUB-KULLANICI-ADINIZ.github.io` |

CNAME değerine depo adını veya `https://` yazmayın. Örnek: `kullaniciadi.github.io`.

4. GitHub'daki **Actions** sekmesinden yayın işini **Run workflow** ile yeniden çalıştırın. Böylece canonical, sitemap ve site içi yollar yeni domaine göre tekrar oluşturulur.
5. DNS doğrulandıktan sonra **Settings → Pages → Enforce HTTPS** seçeneğini açın. DNS yayılımı bazı sağlayıcılarda 24 saate kadar sürebilir.

## 3. Yayın sonrası

- Ana sayfa, iletişim ve hizmet sayfalarını hem telefonda hem bilgisayarda açın.
- Telefon, WhatsApp ve yol tarifi düğmelerini kontrol edin.
- Google Search Console'a `https://ssotoelektrik.com.tr/sitemap.xml` adresini gönderin.
- Google İşletme Profili'ndeki ad, adres ve telefonu sitedeki bilgilerle aynı tutun.

Farklı bir domain alırsanız GitHub Pages'teki **Custom domain** alanına onu yazmanız yeterlidir; otomatik yayın sistemi site URL'lerini o domaine göre üretir.
