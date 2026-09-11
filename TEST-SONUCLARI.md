# Yerel kontrol sonuçları

Kontrol tarihi: 11 Eylül 2026. Chrome ile `http://127.0.0.1:4173` üzerinde ölçüldü.

| Lighthouse | Mobil | Masaüstü |
|---|---:|---:|
| Performans | 91 | 100 |
| Erişilebilirlik | 100 | 100 |
| En iyi uygulamalar | 100 | 100 |
| SEO | 100 | 100 |

Lighthouse puanları ana sayfaya aittir. Mobil ölçüm simüle edilmiş mobil ağ ve işlemci kısıtlarıyla alınmıştır. Gerçek barındırma, cihaz ve ağ koşullarında değişebilir.

İşlevsel test kapsamı:

- 12 HTML sayfasının tümü 360, 768, 1024 ve 1440 pikselde kontrol edildi.
- Yatay taşma, hatalı yerel bağlantı, eksik yerel varlık ve JavaScript hatası kontrol edildi.
- Sayfa başlıkları, açıklamalar, tek H1, canonical adresler, benzersiz element kimlikleri ve görsel alt metinleri doğrulandı.
- Görünen SSS metinleri JSON-LD içeriğiyle karşılaştırıldı.
- Mobil menü, hizmet alt menüsü, Escape ile kapanma ve sayfaya geçiş denendi.
- Telefon, WhatsApp ve yol tarifi hedefleri doğrulandı; bir tıklamanın bir dataLayer olayı oluşturduğu test edildi.
- Formun boş alan, hatalı telefon ve eksik onay durumlarını engellediği doğrulandı.
- Geçerli formun Türkçe karakter ve özel işaretleri doğru kodladığı, WhatsApp mesajı oluşturduğu ve kişisel bilgileri dataLayer'a koymadığı test edildi.
- Özel 404 sayfasının HTTP 404 yanıtıyla sunulduğu ve azaltılmış hareket tercihinin uygulandığı doğrulandı.
- Telefon butonunun ilk mobil ekranda görünmesi kontrol edildi.

Testlerde gerçek telefon araması yapılmadı veya WhatsApp mesajı gönderilmedi. Harita konum sorgusu ve iletişim hedefleri verilen işletme bilgileriyle eşleştirildi; işletmenin fiziksel konumu saha incelemesiyle doğrulanmadı. Google Ads hesabına etiket eklenmedi; hesap kimlikleri yer tutucudur.

Otomatik ayrıntılar: `qa/report.json`, `qa/lighthouse-mobile.json`, `qa/lighthouse-desktop.json`. Görsel kontrol kayıtları: `qa/home-360.png`, `qa/home-768.png`, `qa/home-1024.png`, `qa/home-1440.png`, `qa/home-full-desktop.png`, `qa/accessories-desktop.png`, `qa/contact-desktop.png`, `qa/contact-form-mobile.png`.
