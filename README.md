# İbat Ayakkabı

Next.js ile hazırlanmış çocuk ayakkabısı kataloğu. Geliştirme dalı: `v2`.

## Yerel geliştirme

```sh
npm ci
npm run dev
```

## Cloudflare yayını

Canlı adres: https://ibat.mozkan.com.tr
Worker: `ibat-mozkan`. Dağıtım ayarları `wrangler.jsonc` içinde bulunur.

```sh
npx wrangler login
npm run deploy
```

`npm run build:cloudflare` önce Next.js derlemesini doğrular, ardından `.open-next/` altında Worker ve statik dosyaları hazırlar. OpenNext sürümü mevcut Next.js 14 uygulamasıyla uyumlu olacak şekilde sabitlenmiştir. Görseller mevcut dosyalardan doğrudan sunulur. `scripts/prepare-worker.mjs`, adaptörün boş çalışma dizinini Cloudflare ortamındaki `/bundle` dizinine dönüştürür.

Windows üzerinde derleme için Git for Windows araçlarının (`C:/Program Files/Git/usr/bin`) PATH içinde olması gerekebilir. Linux üzerinde standart npm komutları kullanılabilir.

Ürünler, duyurular ve mevcut yönetici oturumu tarayıcıdaki localStorage üzerinden çalışır. Admin değişiklikleri yalnızca aynı tarayıcıda saklanır; ziyaretçiler arasında paylaşım için sunucu/veritabanı entegrasyonu gerekir.

Cloudflare kimlik bilgileri depoya eklenmez.
