export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tech Birds Consulting",
    "url": "https://techbirdsconsulting.com",
    "logo": "https://techbirdsconsulting.com/images/logo.png",
    "description": "Tech Birds Consulting develops innovative digital solutions including custom business applications, e-commerce platforms, ERP systems, CRM solutions, and enterprise systems.",
    "foundingDate": "2021",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-7702427569",
        "contactType": "Customer Service",
        "email": "info@techbirdsconsulting.com",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/techbirdsconsulting"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200"
    }
  };
};

export const getLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://techbirdsconsulting.com",
    "name": "Tech Birds Consulting",
    "image": "https://techbirdsconsulting.com/images/logo.png",
    "description": "Tech Birds Consulting - Custom software development, ERP systems, CRM solutions, e-commerce platforms, and mobile applications.",
    "url": "https://techbirdsconsulting.com",
    "telephone": "+91-7702427569",
    "email": "info@techbirdsconsulting.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    }
  };
};

export const getWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tech Birds Consulting",
    "url": "https://techbirdsconsulting.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://techbirdsconsulting.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const getServiceSchema = (serviceName: string, description: string, serviceUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "Organization",
      "name": "Tech Birds Consulting",
      "url": "https://techbirdsconsulting.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "description": description,
    "url": serviceUrl
  };
};

export const getAboutPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Tech Birds Consulting",
    "description": "Learn about Tech Birds Consulting - a leading software development company specializing in custom solutions, ERP systems, CRM platforms, and enterprise applications.",
    "url": "https://techbirdsconsulting.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Tech Birds Consulting",
      "foundingDate": "2021",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "50-100"
      }
    }
  };
};

export const getContactPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Tech Birds Consulting",
    "description": "Get in touch with Tech Birds Consulting for custom software development, ERP systems, CRM solutions, and enterprise applications.",
    "url": "https://techbirdsconsulting.com/contact"
  };
};

export const getJobPostingSchema = (job: {
  title: string;
  description: string;
  employmentType: string;
  location: string;
  datePosted?: string;
  validThrough?: string;
  baseSalary?: string;
  experience?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Tech Birds Consulting",
      "value": job.title
    },
    "datePosted": job.datePosted || new Date().toISOString(),
    "validThrough": job.validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": job.employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Tech Birds Consulting",
      "sameAs": "https://techbirdsconsulting.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "IN"
      }
    },
    ...(job.baseSalary && {
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": {
          "@type": "QuantitativeValue",
          "value": job.baseSalary,
          "unitText": "MONTH"
        }
      }
    })
  };
};
