<script setup>
const openNewPage = (url) => {
  window.open(url, '_blank')
}
import icons from '../assets/images/icons.json'

const icon = icons.icons

 icon.map((item) => {
  return {
    src: '../assets/images/' + item.src,
    sizes: item.sizes
  }
})

</script>

<template>
  <main>
    <h1>About Cattery</h1>

    <div class="container-logo">
      <img src="../assets/images/lambang_lorem_ipsum_cattery-removebg-preview.png" alt="" />
    </div>

    <div class="container-deskripsi">
      <h2>Deskripsi Singkat Cattery</h2>
      <p class="deskripsi-cattery">
        Lorem Ipsum Cattery adalah Cattery Kucing Ras Bersertifikat yang telah terdaftar pada Salah
        Satu Organisasi Kucing Di Indonesia yaitu ICC-WCF (Indonesian Cat Council-World Cat
        Federation), Saat ini Cattery Lorem Ipsum Membudidayakan Kucing Ras dengan Jenis British
        Short Hair atau lebih dikenal dengan singkatan BSH.
      </p>
    </div>

    <div class="container-maps">
      <h2>Lokasi Cattery Lorem Ipsum</h2>
      <div>
        <p>
          <i class="fa-solid fa-map-location fa-2xl"></i>
          Perum Grand Sutomo Blok D Nomer 17 Kel.Tlogopatut, Kec.Gresik, Kabupaten Gresik, Jawa
          Timur, Indonesia, 61111
        </p>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.2053166803381!2d112.64285954894085!3d-7.165484127898073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd80069bc464435%3A0xfddabac4baeed1cd!2sPerum.Grand%20Soetomo!5e0!3m2!1sen!2sus!4v1690265592599!5m2!1sen!2sus"
        class="lokasi-cattery"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="container-member-wcf">
      <h2>Member ICC-WCF</h2>
      <p>
        Untuk dapat mengetahui cattery ini apakah sudah terdaftar pada Organisasi ICC-WCF
        (Indonesian Cat Council-World Cat Federation) Dapat dilihat dengan menekan tombol dibawah
        ini
      </p>
      <button
        class="button-check-member"
        @click="openNewPage('https://www.icc-wcf.org/member/lorem-ipsum-cattery/')"
      >
        Check Member Cattery
      </button>
    </div>
    <h2>Link Social Media</h2>

    <div class="container-card" @click="openNewPage('https://www.instagram.com/catless.us/')">
      <div class="card-detail">
        <div class="icon">
          <i class="fa-brands fa-square-facebook fa-2xl"></i>
        </div>
        <p>Facebook: @catless.us</p>
      </div>
      <div class="card-detail" @click="openNewPage('https://www.tiktok.com/@catless')">
        <div class="icon">
          <i class="fa-brands fa-tiktok fa-2xl"></i>
        </div>
        <p>Tiktok: @catless.us</p>
      </div>
      <div
        class="card-detail"
        @click="openNewPage('https://api.whatsapp.com/send?phone=6281249742208')"
      >
        <div class="icon">
          <i class="fa-brands fa-whatsapp fa-2xl"></i>
        </div>
        <p>Whatsapp: 081249742208</p>
      </div>
      <div class="card-detail" @click="openNewPage('https://www.instagram.com/catless.us/')">
        <div class="icon">
          <i class="fa-brands fa-instagram fa-2xl"></i>
        </div>
        <p>Instagram: @catless.us</p>
      </div>
    </div>
    <div></div>
  </main>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  outline: 0;
}
main {
  background-color: white;
  color: black;
  width: 100%;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 50px auto 0 auto;
  .container-logo {
    display: flex;
    justify-content: center;
    img {
      max-width: 100%;
    }
  }
  .container-deskripsi {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .deskripsi-cattery {
      display: flex;
      text-align: justify;
    }
  }
  .container-maps {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .lokasi-cattery {
      padding: 5px;
      background-color: #ffd482;
      width: 100%;
      height: 600px;
    }
  }
  .container-member-wcf {
    .button-check-member {
      padding: 10px;
      border-radius: 10px;
      background-color: #ffe569;
      cursor: pointer;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }
    button:hover {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }
  .container-social-media {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .container-card {
    display: grid;
    gap: 10px;
    margin-top: 10px;
    .card-detail {
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid #ffd482;
      width: 100%;
      gap: 10px;
      .icon {
        padding: 20px;
      }
    }
  }
}

@media only screen and (min-width: 768px) {
  main {
    .container-card {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media only screen and (min-width: 1024px) {
  main {
    .container-card {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
