app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        },
    },
    template:
        /*html*/
        `
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <!-- <img v-bind:src="image"> -->
          <img :class="{ 'out-of-stock-img': !inStock }" :src="image">
        </div>
        <div class="product-info">
          <!-- <h1>{{ product }}</h1> -->
          <h1>{{ title }}</h1>
          <!-- <p>{{ desc }}</p> -->
          <!-- <a :href="url">{{ url }}</a> -->

          <!-- <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p> -->

          <p v-if="inventory > 10">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
          <p v-else>Out of Stock</p>

          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
          <!-- <div v-for="variant in variants" :key="variant.id" @mouseover="updateImage(variant.image)"
            class="color-circle" :style="{ backgroundColor: variant.color}"> -->
          <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)"
            class="color-circle" :style="{ backgroundColor: variant.color}">
          </div>
          <!-- <button class="button" v-on:click="cart += 1">Add to Cart</button> -->
          <!-- <button class="button" v-on:click="addToCart">Add to Cart</button> -->
          <button class="button" :class="{ disabledButton: !inStock}" :disabled="!inStock" @click="addToCart">
            Add to Cart
          </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            desc: 'product description...',
            //image: './assets/images/socks_green.jpg',
            url: 'https://github.com/dafengge0913',
            //inStock: false,
            inventory: 8,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 10 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].id);
        },
        updateImage(variantImage) {
            this.image = variantImage
        },
        updateVariant(index) {
            this.selectedVariant = index
            // console.log(index)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        },
    }
})