import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeBrands = () => {
  return (
    <>
     <div className="w-full bg-gray-800">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h2 className="text-base font-bold text-blue-600">
              We have the best Supplement Brands in the market
            </h2>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
              Check our awesome Brands
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/*  {data.allMarkdownRemark.nodes.map(node => {      return (*/ /* key={node.id} */ } 
                <div  className="w-full bg-gray-900 rounded-lg p-12 flex flex-col justify-center items-center hover:scale-110 shadow-lg">
                  <div className="mb-8">
                    <Image className="object-center object-cover  " src='/public/vercel.svg' width={10px} height={10px}  alt="photo" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-white font-bold mb-2">node.frontmatter.title</p>
                    {/* <p className="text-base text-gray-400 font-normal">{node.frontmatter.slug}</p>
                    <p className="text-base text-gray-400 font-normal">{node.html}</p> 
                    <Link to= {node.frontmatter.Url}>*/}
                      <button class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                        <div class="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span class="relative text-black group-hover:text-white font-semibold">SHOP NOW</span>
                      </button>
                  </div>
                </div>
           {/*   )
             })}*/}
          </div>         
        </section>
      </div>
    </>
   
  )
}

export default HomeBrands
