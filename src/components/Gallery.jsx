import React from 'react';
import { motion } from 'framer-motion';
const Gallery = () => {
  // To host images locally put your image files in `public/gallery/`.
  // Example filenames: img1.jpg, img2.jpg, ... img9.jpg
  // Then use paths beginning with `/gallery/...` as the `src` values below.
  // If you prefer an external URL just replace the `src` value with the URL.
  const images = [
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczOafXRCpIPPC36TX0kYVKfRBcsCW_kach7VURimE7-3KboTTjU4sfyOyGJda9QeS5NW1TKCKqkgR8JNIGwvBEpLFHC4GSjnTiJNCVAKARW9b_5PNuGvA8yWDtZtVpi2CTGA9-msHuj-jHhDVeiM7ffa=w1170-h878-s-no-gm?authuser=0',
      caption: 'Students during interactive real estate training session'
    },
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczNSZpbPzk3_cdMS9B7NQxZH9X4ch0rPw-Gtr1msVEbHsST7KD37OyhP3y5-3Z0y97vGFaVAEPlS7iijnal1YhtJJikwmHQ8a5Q30QB2MWjkcSlCna5R-9DZdpG9Rl-Y299_nlg9c2KBe_LuFb1oDq3T=w1166-h878-s-no-gm?authuser=0',
      caption: '“Interactive classroom session with Gampa Nageshwer Rao sir'
    },
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczNuFsVJWjSKAHZGKto96t0yxKbS1ahBilAvtZj37lvUcDCOrQbYH6594_VolFDDMSMkLjKrJGgS-SESESRjdhUrIo1tJdg5osf_fkIrggPCJJ8LWk1r9lqyZD0a4JjD0qTI8zDfwF2dQHQKDiVFreiG=w1215-h915-s-no-gm?authuser=0',
      caption: 'Property site visit with students learning field inspection'
    },
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczMf9kNzj2YIHplOSKRA0LBhOayYGW5z2EtyI_on73X-5YgaSwRIdVi7Fr8gRXNduAmF2V_XbHDXhi4cX3WZ1xavuMViqK5jgyAIGnE8U_VrjPilzbpAuOf13Bqa_kjbXYl2AWyK-dlgMKdVEsLR7zFS=w1215-h915-s-no-gm?authuser=0',
      caption: 'Professional certification ceremony for graduates'
    },
    // Example video tile: place your video file in `public/gallery/clip1.mp4`
    // and an optional poster `public/gallery/clip1-poster.jpg`.
    {
      type: 'video',
      // Use a direct video file hosted in `public/gallery/` for reliable autoplay.
      // Place your file at: public/gallery/clip1.mp4 (or change name/path here).
      src: '/VID_20251124_143314.webm',
      poster: '/VID_20251124_143314.webm',
      caption: 'Short clip: Students undergoing field training under the guidance of Gampa Nageshwer Rao sir.'
    },
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczOv2TgJ74pB-lC3G6FOjYh9GWp-9hG5rHRmov_C9GuEBGjVIMy8x1C0tdm1sXtnIE63EcIghK29m46MFwQboOdPbkmHFrQCg8YVeELlUvvNDhrPHGbqyI8RmwLS4bnwInb2cuBa4RC34eRM5tvJYHc=w1215-h915-s-no-gm?authuser=0',
      caption: 'Sales skills training and role-play session'
    },
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczMuWV_XhvAS41ft-yMRGOlYMJkEgmWtmVhSdZgooTx7P1E7UcdsynGNFMU4rC7LxN4kgOoUKyU5f-6KgeLJPUSTg8BshMeCXCKFtKnIPrSbvv7xX1xVsRbTuATdf8Cs2tcfPBLk4tyn2eKIc_2HLcfH=w1215-h915-s-no-gm?authuser=0',
      caption: 'Guest lecture by industry real estate expert'
    },
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczNrHTEcvO4VSOB5YbYEg8MDsMIvIQc4-qi62qu8tLWnEHFjZ0zknC6dB929FXx5RYwup0KlDFO2FSoeBhvAZoB1HusDT2pVTRohbxlPpsou519nxv2mGWECKNGb_Pn3tAlpbupT71dhV7K2Durd7wKC=w1215-h915-s-no-gm?authuser=0',
      caption: 'Digital marketing workshop for real estate agents'
    },
   //
    {
      src: 'https://lh3.googleusercontent.com/pw/AP1GczP9zij0ZE3aAARPXWGB-9bVnMBvjyUH49CGPJX84Qqq1zXipiaT_Kk45khGog11WRQjOlE-VY9mstBo3RGMyx2qoIOAqq8LMDQ5EuTjBu2duEWpsjKEe6pysCRjMUrtwEVI_DNqokYaiWgc1sSjIStj=w1215-h915-s-no-gm?authuser=0',
      caption: 'Practical negotiation skills training session'
    }
  ];
  return <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2F3542] mb-4 font-poppins">
            Our <span className="text-[#1E3A8A]">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-[#D4A017] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Glimpses from our training sessions, workshops, and student achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-[4/3] border-4 border-transparent group-hover:border-[#D4A017] transition-all duration-500 rounded-2xl">
                {image.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={image.src}
                    poster={image.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={image.caption}
                    src={image.src}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#2F3542] via-[#2F3542]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {image.caption}
                  </p>
                </div>
              </div>

              {/* Golden Border Animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ boxShadow: '0 0 0px rgba(212, 160, 23, 0)' }}
                whileHover={{ boxShadow: '0 0 25px rgba(212, 160, 23, 0.6)' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>;
};
export default Gallery;