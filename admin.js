
class AdminPanel {
    constructor() {
        this.products = [];
        this.currentEditId = null;
        this.shoeImageList = [
            "1194207_SSRT1907CİLTF_4.jpg","1194208_SSRT1907CİLTF_6.jpg","1194209_SSRT1907CİLTF_10.jpg","1194210_SSRT1907CİLTF_8.jpg","1194211_SSRT1907CİLTF_11.jpg","1194212_SSRT1907CİLTF_3.jpg","1194213_SSRT1907CİLTF_9.jpg","1194214_SSRT1907CİLTF_5.jpg","1194215_SSRT1907CİLTF_1.jpg","1194216_SSRT1907CİLTF_2.jpg","1195404_TOMWS1017BOTP_120.jpg","1195404_TOMWS1017BOTP_121.jpg","1195404_TOMWS1017BOTP_122.jpg","1195407_TOMWS1017BOTP_117.jpg","1195407_TOMWS1017BOTP_118.jpg","1195407_TOMWS1017BOTP_119.jpg","1195411_TOMWS1017BOTF_114.jpg","1195411_TOMWS1017BOTF_115.jpg","1195411_TOMWS1017BOTF_116.jpg","1195412_TOMWS1017BOTF_111.jpg","1195412_TOMWS1017BOTF_112.jpg","1195412_TOMWS1017BOTF_113.jpg","1195413_TOMWS1017BOTF_1.jpg","1195413_TOMWS1017BOTF_2.jpg","1195413_TOMWS1017BOTF_3.jpg","1195414_TOMWS1017BOTF_4.jpg","1195414_TOMWS1017BOTF_5.jpg","1195414_TOMWS1017BOTF_6.jpg","1195415_TOMWS1017BOTF_108.jpg","1195415_TOMWS1017BOTF_109.jpg"
        ];
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.populateImageSelect();
        this.updateDashboardStats();
        this.renderProductsTable();
        this.setupImageUpload();
    }

    loadProducts() {
        const savedProducts = localStorage.getItem('tomwins_products');
        if (savedProducts) {
            this.products = JSON.parse(savedProducts);
        } else {
            
            this.createDefaultProducts();
        }
    }

    saveProducts() {
        localStorage.setItem('tomwins_products', JSON.stringify(this.products));
        
        localStorage.setItem('tomwins_products_public', JSON.stringify(this.products));
    }

    createDefaultProducts() {
        const kategoriList = ["Sportswear","Originals","Yürüyüş","TERREX"];
        const renkList = ["3 renk","6 renk","2 renk","5 renk"];
        const fiyatList = [2749, 2249, 1999, 2349, 2929, 1899, 2599, 1649];
        
        for(let i=0; i<30; i++) {
            this.products.push({
                id: `product_${i+1}`,
                model: `${i+1}`,
                name: `TomWins Model ${i+1}`,
                age: ["0-2 Yaş","3-6 Yaş","7-12 Yaş"][i%3],
                gender: ["Unisex","Kız","Erkek"][i%3],
                desc: `Bu model ${i+1} için açıklama örneği.`,
                image: this.shoeImageList[i % this.shoeImageList.length],
                price: fiyatList[i%fiyatList.length],
                category: kategoriList[i%kategoriList.length],
                color: renkList[i%renkList.length],
                createdAt: new Date().toISOString()
            });
        }
        this.saveProducts();
    }

   
    setupEventListeners() {
        
        document.getElementById('add-product-btn').addEventListener('click', () => this.showProductForm());
        document.getElementById('product-form').addEventListener('submit', (e) => this.handleProductSubmit(e));
        document.getElementById('cancel-btn').addEventListener('click', () => this.hideProductForm());

        
        document.getElementById('search-products').addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('filter-category').addEventListener('change', (e) => this.handleFilter(e.target.value));

        
        document.getElementById('confirm-no').addEventListener('click', () => this.hideModal());
    }

    showProductForm(product = null) {
        const formContainer = document.getElementById('product-form-container');
        const form = document.getElementById('product-form');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (product) {
            this.currentEditId = product.id;
            submitBtn.textContent = 'Güncelle';
            this.fillProductForm(product);
        } else {
            this.currentEditId = null;
            submitBtn.textContent = 'Kaydet';
            form.reset();
        }

        formContainer.style.display = 'block';
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }

    hideProductForm() {
        document.getElementById('product-form-container').style.display = 'none';
        this.currentEditId = null;
    }

    fillProductForm(product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-model').value = product.model;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-color').value = product.color;
        document.getElementById('product-age').value = product.age;
        document.getElementById('product-gender').value = product.gender;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-desc').value = product.desc;

        const imageSelect = document.getElementById('product-image');
        const uploadPreview = document.getElementById('upload-preview');
        const previewImage = document.getElementById('preview-image');
        const uploadArea = document.getElementById('upload-area');

        if (product.image && product.image.startsWith('data:')) {
            previewImage.src = product.image;
            uploadPreview.style.display = 'block';
            uploadArea.style.display = 'none';
            imageSelect.value = '';
        } else {
            imageSelect.value = product.image;
            uploadPreview.style.display = 'none';
            uploadArea.style.display = 'block';
        }
    }

    handleProductSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const imageSelect = document.getElementById('product-image');
        const uploadPreview = document.getElementById('upload-preview');
        
        let imageData = formData.get('image');
        
        if (imageData && imageData.startsWith('uploaded_')) {
            const uploadedImages = JSON.parse(localStorage.getItem('tomwins_uploaded_images') || '[]');
            const uploadedImage = uploadedImages.find(img => img.id === imageData);
            if (uploadedImage) {
                imageData = uploadedImage.dataUrl; // Data URL kullan
            }
        }

        const productData = {
            name: formData.get('name'),
            model: formData.get('model'),
            category: formData.get('category'),
            color: formData.get('color'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            price: parseInt(formData.get('price')),
            image: imageData,
            desc: formData.get('desc')
        };

        if (this.currentEditId) {
            
            this.updateProduct(this.currentEditId, productData);
        } else {
            this.addProduct(productData);
        }

        this.hideProductForm();
        this.updateDashboardStats();
        this.renderProductsTable();
        this.showNotification('Ürün başarıyla kaydedildi!', 'success');
    }

    addProduct(productData) {
        const newProduct = {
            id: `product_${Date.now()}`,
            ...productData,
            createdAt: new Date().toISOString()
        };
        this.products.push(newProduct);
        this.saveProducts();
    }

    updateProduct(id, productData) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...productData,
                updatedAt: new Date().toISOString()
            };
            this.saveProducts();
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.saveProducts();
        this.updateDashboardStats();
        this.renderProductsTable();
        this.showNotification('Ürün başarıyla silindi!', 'success');
    }

    renderProductsTable() {
        const tbody = document.getElementById('products-tbody');
        tbody.innerHTML = '';

        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="product-image-cell">
                    <img src="images/${product.image}" alt="${product.name}" onerror="this.src='https://dummyimage.com/60x45/ff9800/fff&text=TW'">
                </td>
                <td class="product-name-cell">${product.name}</td>
                <td class="product-model-cell">${product.model}</td>
                <td class="product-category-cell">${product.category}</td>
                <td class="product-tags-cell">
                    <span class="tag age">${product.age}</span>
                    <span class="tag gender">${product.gender}</span>
                </td>
                <td class="product-price-cell">${product.price.toLocaleString('tr-TR')} TL</td>
                <td class="product-actions-cell">
                    <button class="btn-edit" onclick="adminPanel.editProduct('${product.id}')">Düzenle</button>
                    <button class="btn-delete" onclick="adminPanel.showDeleteConfirm('${product.id}')">Sil</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            this.showProductForm(product);
        }
    }

    handleSearch(searchTerm) {
        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderFilteredProducts(filteredProducts);
    }

    handleFilter(category) {
        if (!category) {
            this.renderProductsTable();
            return;
        }
        
        const filteredProducts = this.products.filter(product => 
            product.category === category
        );
        this.renderFilteredProducts(filteredProducts);
    }

    renderFilteredProducts(products) {
        const tbody = document.getElementById('products-tbody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="product-image-cell">
                    <img src="images/${product.image}" alt="${product.name}" onerror="this.src='https://dummyimage.com/60x45/ff9800/fff&text=TW'">
                </td>
                <td class="product-name-cell">${product.name}</td>
                <td class="product-model-cell">${product.model}</td>
                <td class="product-category-cell">${product.category}</td>
                <td class="product-tags-cell">
                    <span class="tag age">${product.age}</span>
                    <span class="tag gender">${product.gender}</span>
                </td>
                <td class="product-price-cell">${product.price.toLocaleString('tr-TR')} TL</td>
                <td class="product-actions-cell">
                    <button class="btn-edit" onclick="adminPanel.editProduct('${product.id}')">Düzenle</button>
                    <button class="btn-delete" onclick="adminPanel.showDeleteConfirm('${product.id}')">Sil</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateDashboardStats() {
        const totalProducts = this.products.length;
        const totalImages = this.shoeImageList.length;
        const categories = [...new Set(this.products.map(p => p.category))].length;
        const avgPrice = this.products.length > 0 
            ? Math.round(this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length)
            : 0;

        document.getElementById('total-products').textContent = totalProducts;
        document.getElementById('total-images').textContent = totalImages;
        document.getElementById('categories-count').textContent = categories;
        document.getElementById('avg-price').textContent = avgPrice.toLocaleString('tr-TR') + ' TL';
    }

    populateImageSelect() {
        const imageSelect = document.getElementById('product-image');
        imageSelect.innerHTML = '<option value="">Görsel Seçin</option>';
        
        this.shoeImageList.forEach(image => {
            const option = document.createElement('option');
            option.value = image;
            option.textContent = image;
            imageSelect.appendChild(option);
        });

        this.loadUploadedImages();
    }

    loadUploadedImages() {
        try {
            const uploadedImages = JSON.parse(localStorage.getItem('tomwins_uploaded_images') || '[]');
            const imageSelect = document.getElementById('product-image');
            
            uploadedImages.forEach(imageData => {
                this.addImageToSelect(imageData);
            });
        } catch (error) {
            console.error('Error loading uploaded images:', error);
        }
    }

    addImageToSelect(imageData) {
        const imageSelect = document.getElementById('product-image');
        const option = document.createElement('option');
        option.value = imageData.id;
        option.textContent = `📤 ${imageData.name} (Yüklenen)`;
        option.dataset.dataUrl = imageData.dataUrl;
        imageSelect.appendChild(option);
    }

    showDeleteConfirm(id) {
        const product = this.products.find(p => p.id === id);
        const modal = document.getElementById('confirm-modal');
        const message = document.getElementById('confirm-message');
        
        message.textContent = `"${product.name}" ürününü silmek istediğinizden emin misiniz?`;
        modal.style.display = 'flex';
        
        const confirmYes = document.getElementById('confirm-yes');
        const confirmNo = document.getElementById('confirm-no');
        
        const handleConfirm = (shouldDelete) => {
            if (shouldDelete) {
                this.deleteProduct(id);
            }
            this.hideModal();
            confirmYes.removeEventListener('click', () => handleConfirm(true));
            confirmNo.removeEventListener('click', () => handleConfirm(false));
        };
        
        confirmYes.addEventListener('click', () => handleConfirm(true));
        confirmNo.addEventListener('click', () => handleConfirm(false));
    }

    hideModal() {
        document.getElementById('confirm-modal').style.display = 'none';
    }

    showNotification(message, type = 'info') {
        const existingNotification = document.querySelector('.admin-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : type === 'error' ? 'background: #ef4444;' : 'background: #2563eb;'}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    setupImageUpload() {
        const uploadArea = document.getElementById('upload-area');
        const imageUpload = document.getElementById('image-upload');
        const uploadPreview = document.getElementById('upload-preview');
        const previewImage = document.getElementById('preview-image');
        const removeUpload = document.getElementById('remove-upload');
        const imageSelect = document.getElementById('product-image');

        uploadArea.addEventListener('click', () => {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImageUpload(file);
            }
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageUpload(file);
            }
        });

        removeUpload.addEventListener('click', () => {
            this.clearImageUpload();
        });

        imageSelect.addEventListener('change', () => {
            if (imageSelect.value) {
                this.clearImageUpload();
            }
        });
    }

    handleImageUpload(file) {
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('Dosya boyutu 5MB\'dan küçük olmalıdır!', 'error');
            return;
        }

        if (!file.type.startsWith('image/')) {
            this.showNotification('Lütfen geçerli bir resim dosyası seçin!', 'error');
            return;
        }

        const reader = new FileReader();
        const uploadPreview = document.getElementById('upload-preview');
        const previewImage = document.getElementById('preview-image');
        const uploadArea = document.getElementById('upload-area');
        const imageSelect = document.getElementById('product-image');

        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadPreview.style.display = 'block';
            uploadArea.style.display = 'none';

            imageSelect.value = '';

            this.saveUploadedImage(file, e.target.result);
        };

        reader.readAsDataURL(file);
    }

    saveUploadedImage(file, dataUrl) {
        try {
            const uploadedImages = JSON.parse(localStorage.getItem('tomwins_uploaded_images') || '[]');
            
            const imageData = {
                id: `uploaded_${Date.now()}`,
                name: file.name,
                dataUrl: dataUrl,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString()
            };

            uploadedImages.push(imageData);
            localStorage.setItem('tomwins_uploaded_images', JSON.stringify(uploadedImages));

            this.addImageToSelect(imageData);
            
            this.showNotification('Resim başarıyla yüklendi!', 'success');
        } catch (error) {
            this.showNotification('Resim yüklenirken hata oluştu!', 'error');
            console.error('Image upload error:', error);
        }
    }

    clearImageUpload() {
        const uploadPreview = document.getElementById('upload-preview');
        const uploadArea = document.getElementById('upload-area');
        const imageUpload = document.getElementById('image-upload');

        uploadPreview.style.display = 'none';
        uploadArea.style.display = 'block';
        imageUpload.value = '';
    }
}

let adminPanel;
document.addEventListener('DOMContentLoaded', function() {
    adminPanel = new AdminPanel();
}); 