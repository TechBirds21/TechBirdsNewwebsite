import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimatedSection, { StaggerContainer, StaggerItem, GradientText } from './AnimatedSection';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What types of digital solutions does Tech Birds Consulting develop?",
      answer: "We develop a wide spectrum of digital solutions including custom web applications for internal business use, scalable e-commerce platforms with custom admin panels, mobile applications for Android and iOS, enterprise systems, API integrations, automation tools, and cloud-based solutions."
    },
    {
      question: "How long does it typically take to develop a project?",
      answer: "Development timelines vary based on project complexity and scope. Simple custom applications take 4-8 weeks, e-commerce platforms typically require 8-16 weeks, while complex enterprise systems may take 3-6 months. We provide detailed timelines during our initial consultation phase."
    },
    {
      question: "Do you develop both web and mobile applications?",
      answer: "Yes, we specialize in both web and mobile application development. We create responsive web applications, native iOS and Android apps, cross-platform solutions using React Native, and progressive web apps (PWAs)."
    },
    {
      question: "Can you help with existing systems or only build from scratch?",
      answer: "We work with both new projects and existing systems. Our services include modernizing legacy applications, adding new features to existing platforms, optimizing performance, integrating with third-party systems, and providing ongoing maintenance."
    },
    {
      question: "What makes your e-commerce development expertise special?",
      answer: "Our e-commerce expertise is demonstrated through custom platforms with comprehensive admin panels. We develop solutions from simple online stores to complex multi-vendor marketplaces with advanced features like secure payment systems and inventory management."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Absolutely! We provide comprehensive ongoing support including regular updates, security patches, performance monitoring, feature enhancements, and technical assistance."
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-20" animation="blur">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-6">
            <HelpCircle size={14} className="text-blue-600" />
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Information Hub</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-950 mb-6 tracking-tighter">
            Common <GradientText from="#2563eb" to="#0891b2">Questions.</GradientText>
          </h2>
        </AnimatedSection>

        <StaggerContainer staggerDelay={0.05}>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-slate-50/50 rounded-[2rem] px-8 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)] data-[state=open]:bg-white data-[state=open]:shadow-2xl data-[state=open]:border-blue-100 group"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-8 text-slate-900 group">
                    <span className="text-xl font-bold tracking-tight pr-8 transition-colors group-hover:text-blue-600">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <motion.p 
                      className="text-slate-500 leading-relaxed font-medium text-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </StaggerItem>
            ))}
          </Accordion>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FAQ;
