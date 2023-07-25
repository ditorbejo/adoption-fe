<script setup>
const openNewPage = (url) => {
  window.open(url, '_blank')
}
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
    <div class="container-social-media">
      <h2>Social Media</h2>
      <p>
        <i class="fa-brands fa-whatsapp"></i>
        WhatsApp: 081249742208
      </p>
      <p>
        <i class="fa-brands fa-facebook"></i>
        Facebook: 081249742208
      </p>
      <p>
        <i class="fa-brands fa-instagram"></i>
        Instagram: Catless.us
      </p>
    </div>
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
      padding: 10px;
      background-color: #bff878;
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
}
</style>
