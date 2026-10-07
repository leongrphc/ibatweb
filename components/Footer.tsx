import Link from "next/link";

export default function Footer() {
  return (
    <footer className="store-footer">
      <div className="container-custom footer-grid">
        <div>
          <Link
            href="/"
            className="footer-wordmark"
            aria-label="İbat ana sayfa"
          >
            İBAT.
          </Link>
          <p>
            İlk adımlardan yeni keşiflere.
            <br />
            Çocukların dünyasına eşlik eden ayakkabılar.
          </p>
          <span className="footer-tagline">BEBE · PATİK · FİLET</span>
        </div>
        <nav aria-label="Koleksiyon bağlantıları">
          <h2>Koleksiyon</h2>
          <Link href="/shop?category=BEBE">
            Bebe <span>22–25</span>
          </Link>
          <Link href="/shop?category=PAT%C4%B0K">
            Patik <span>26–30</span>
          </Link>
          <Link href="/shop?category=F%C4%B0LET">
            Filet <span>31–35</span>
          </Link>
        </nav>
        <nav aria-label="Keşfet">
          <h2>Keşfet</h2>
          <Link href="/shop">Tüm ürünler</Link>
          <Link href="/shop?filter=new">Yeni gelenler</Link>
          <Link href="/shop?filter=sale">İndirimli ürünler</Link>
        </nav>
        <div>
          <h2>Toptan & perakende</h2>
          <p>
            Mağazanız veya çocuğunuz için numara seçeneklerini ve fiyatları ürün
            sayfalarında keşfedin.
          </p>
          <Link href="/shop" className="footer-cta">
            Kataloğu incele <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="container-custom footer-bottom">
        <p>© {new Date().getFullYear()} İbat Ayakkabı. Tüm hakları saklıdır.</p>
        <Link href="/admin">Yönetim paneli</Link>
      </div>
    </footer>
  );
}
