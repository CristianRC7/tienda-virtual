import React from 'react'

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">Nuestra Historia</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Más que una tienda, somos tu estilo
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Desde 2010, nos hemos dedicado a ofrecer la mejor calidad en ropa y accesorios. Nuestra pasión por la moda y el compromiso con nuestros clientes nos han convertido en un referente en el mundo de la moda.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nos enorgullece contar con un equipo de diseñadores talentosos y expertos en tendencias, que trabajan constantemente para traer lo mejor en moda a nuestros clientes. Además, nuestros procesos de producción son sostenibles y comprometidos con el medio ambiente.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
