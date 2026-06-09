import { useLanguage } from '../i18n/LanguageContext'



export default function SpaPage() {

  const { t } = useLanguage()

  return (

    <section className="relative -mt-16 min-h-[calc(100dvh-200px)] bg-[#f3eee6] px-6 pb-24 pt-24 md:min-h-[calc(100dvh-220px)] md:pb-32 md:pt-32">

      <div className="mx-auto flex max-w-[560px] flex-col items-center justify-center text-center">

        <h1 className="font-cormorant text-[44px] font-normal leading-none tracking-[0] text-[#171412] md:text-[52px] lg:text-[56px]">

          {t('placeholder.spaTitle')}

        </h1>
               
               
        <p className="mt-8 font-sans text-[15px] font-medium uppercase tracking-[0.14em] text-[#6e361b]">{t('placeholder.spaSoon')}</p>

        <p className="mt-5 font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">{t('placeholder.spaBody')}</p>

      </div>

    </section>

  )

}

