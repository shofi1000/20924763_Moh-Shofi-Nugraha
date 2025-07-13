// Tambah produk ke keranjang (dengan harga dan jumlah default = 1)
function beliProduk(namaProduk, harga = 0) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    // Cek apakah produk sudah ada, kalau ada tambah jumlah
    const index = keranjang.findIndex(item => item.nama === namaProduk);
    if (index !== -1) {
        keranjang[index].jumlah += 1;
    } else {
        keranjang.push({ nama: namaProduk, harga: harga, jumlah: 1 });
    }

    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    alert(`${namaProduk} berhasil ditambahkan ke keranjang.`);
}

// Tampilkan isi keranjang
function tampilkanKeranjang() {
    const container = document.getElementById("isi-keranjang");
    const totalHargaEl = document.getElementById("total-harga");
    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

    if (keranjang.length === 0) {
        container.innerHTML = "<p>Keranjang kamu kosong.</p>";
        totalHargaEl.innerText = "Rp0";
        return;
    }

    let total = 0;
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Produk</th>
                    <th>Harga</th>
                    <th>Jumlah</th>
                    <th>Subtotal</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;

    keranjang.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        html += `
            <tr>
                <td>${item.nama}</td>
                <td>Rp${item.harga.toLocaleString()}</td>
                <td>${item.jumlah}</td>
                <td>Rp${subtotal.toLocaleString()}</td>
                <td><button onclick="hapusItem(${index})">Hapus</button></td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
    totalHargaEl.innerText = "Rp" + total.toLocaleString();
}

// Hapus 1 item dari keranjang
function hapusItem(index) {
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang.splice(index, 1);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    tampilkanKeranjang();
}

// Proses checkout
function checkout() {
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    if (!nama || !email || !alamat) {
        alert("Harap isi semua data pembeli.");
        return;
    }

    const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    const total = keranjang.reduce((acc, item) => acc + item.harga * item.jumlah, 0);
    alert(`Terima kasih ${nama}, total pembayaranmu adalah Rp${total.toLocaleString()}. Pesanan sedang diproses!`);

    // Kosongkan keranjang
    localStorage.removeItem("keranjang");
    document.getElementById("checkout-form").reset();
    tampilkanKeranjang();
}

function cariProduk() {
    const input = document.getElementById("search-input").value.toLowerCase();
    const produkList = document.getElementsByClassName("produk");

    for (let i = 0; i < produkList.length; i++) {
        const namaProduk = produkList[i].getElementsByTagName("h2")[0].textContent.toLowerCase();

        if (namaProduk.includes(input)) {
            produkList[i].style.display = "block";
        } else {
            produkList[i].style.display = "none";
        }
    }
}
