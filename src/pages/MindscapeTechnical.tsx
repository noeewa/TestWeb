import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code } from 'lucide-react';
import { useLayoutEffect } from 'react';

const MindscapeTechnical: React.FC = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const sections = [
    {
      title: "What Happen To ME?",
      content: `Aku bukan orang yang bisa mendalami suatu perasaan orang lain ataupun sikap yang expresif. Entah kenapa itu menjadi suatu takaran bagiku untuk mengukur seberapa bodohnya diriku dalam hal sosial. Kadang aku mengganngap mendalami suatu perasann melankolis, dramatisasi dan lainya menjadi hal yang konyol karena
      semacam ada persaan bahwa aku tidak layak untuk mendalami persaan diri karena aku ini bodoh secara sosial? Jadi aku menolah beberapa persaan seperti itu. Akhir akhir ini aku sering merasakan suatu keganjalan dalam pikiran. bukan suatu yang meresahkan atau mengkhawatirkan, tapi lebih persaan mendalam karena suatu hal yang tak terelakan.`
    },
    {
      title: "Sebelumnya",
      content: `Salah satu hal yang paling sering kupikirkan adalah bagaimana kedepannya. Diposisiku sekarang, aku seorang mahasiswa sistem informasi, dimana lebih banyak beljar tentang hal terkait menajemen bisinis dibanding tentang hal teknis dalam pemrogramman. setelah menjalani beberapa minggu, aku menakar - nakar bagaimana aku kedepannya, skillku, dan apa yang ingin kucapai.
      Tidak semuannya terjawab dan hanya menjadi pertanyaan sampai sekarang`
    },
    {
      title: "Perbedaan",
      content: `Membandingkan kesana kemari, Aku diberi dua pilihan sulit. Menjadi seorang yang lebih teknis dan mendalami banyak bahasa pemrogramman lalu bekerja menjadi seorang programmer, atau menjadi seorang bisnis menajer, memimpim perusahaan, dan memanajemen berbagai hal. Aku memilih tidak menjawabnya sekarang karena aku tidak mau dibatasi oleh dua expetasi itu sendiri. karena itu aku akan lebih spesifik dalam menjelaskan hal yang kuinginkan. 
      Aku tidak mau menjadi orang yang terlalu sibuk didalam bisnis, ataupun orang yang terlalu lemah untuk bisa menguasai sebuah gagasan, dan cita-cita yang ingin dicapai, apalgi berkaitan dengan suatu hal yang besar. Maka dari itu aku tetap butuh skill agar aku bisa membuat sesuatu, dan menjadi bagian dari sesuatu, tapi selain itu aku juga butuh hal yang bisa membuat gagasan ku terealisasikan terutama hal yang melibatkan banyak orang. Antara lain targetku adalah sebagai berikut:`
    },
    {
      title: "Manajement Skills",
      content: `Skill untuk memimpin dan memimpin tim adalah yang palin menjadi masalah utama, karena tidak ada hal menjadi aturan jelas bagaimana kita harus mimpin yang menurutku cuman bisa didapatkan dari pengalaman`
    },
    {
      title: "Web Development",
      content: `Aku mengganggap Frontend adalah tempat pertama orang berinteraksi, entah itu dengan aplikasi, web atau yang lainya dimana impresi pertama seseorang terbentuk.`
    },
    {
      title: "Sains Data",
      content: `Data menjadi suatu hal yang pasti ada, bagaimana mengelola sebuah informasi, apalagi informasi yang sangat besar menjadi sebuah kesimpulan`
    },
    {
      title: "Aritificial Intelligence",
      content: `AI menorobos banyak hal. membuat ia menjadi alat bantu dalam banyak hal`
    },
    {
      title: "Computer Vision",
      content: `Jika Frontend adalah tempat muka pertama seseorang berinteraksi dengan sistem, maka computer vision menjadi muka pertama interaksi komputer dengan lingkungan`
    },
    {
      title: "Geometry",
      content: `Ini adalah spesifikasi yang setidaknya ingin kupelajari`
    },
    {
      title: "Simulation",
      content: `Dimana simulasi yang kumaksud lebih kearah simulasi matematis.`
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 -mt-24">
      {/* Header */}
      <header className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Code className="text-cyan-400" size={20} />
            <span className="bg-cyan-400 text-black px-3 py-1 text-sm font-bold">
              Technical Topics & Development
            </span>
          </div>
          
          <h1 className="font-black mb-6">
            19 September 2025
          </h1>
          
          <p className="text-gray-300 max-w-2xl">
            Well, Sedikit berpikir lagi setelah sekian lama. Sesi ini adalah momen setelah berakhirnya masa PPMB selesai.
          </p>
        </div>
      </header>

      {/* Content Sections */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, index) => (
            <section key={index} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-[0.2px] h-8 bg-gray-200/30 "></div>
                <h2 className="font-black">
                  {section.title}
                </h2>
              </div>
              
              <div className="bg-black border-[0.0px] border-gray-200/30 p-6">
                <div 
                  className="whitespace-pre-line leading-relaxed"
                >
                  {section.content}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Back to Navigator */}
      <section className="py-16 text-center border-t border-gray-800">
        <h2 className="font-black mb-4">Back to Navigator</h2>
        <p className="text-gray-300 mb-8">
          Return to the mindscape navigator to explore other sections
        </p>
        <Link 
          to="/mindscape"
          className="inline-flex items-center gap-2 bg-gray-100 text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Navigator
        </Link>
      </section>

      {/* Footer Quote */}
      <footer className="py-8 text-center border-t border-gray-800">
        <p className="text-sm italic text-gray-400">
          "Technology is best when it brings people together"
        </p>
      </footer>
    </div>
  );
};

export default MindscapeTechnical;