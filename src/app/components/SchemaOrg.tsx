interface SchemaOrgProps {
  type?: 'Organization' | 'WebSite' | 'GameServer' | 'SoftwareApplication' | 'FAQPage' | 'HowTo' | 'Product' | 'LocalBusiness';
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // For custom schema data like FAQ items or Product details
}

export const SchemaOrg = ({ 
  type = 'Organization', 
  name = 'AvixNode', 
  description = 'Premium game server hosting for Minecraft, Rust, ARK, Valheim and more.',
  url = 'https://avixnode.com',
  logo = 'https://avixnode.com/assets/weblogo.png',
  data
}: SchemaOrgProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseSchema: any = {
    '@context': 'https://schema.org',
    '@type': type,
    'name': name,
    'description': description,
    'url': url,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let schema = { ...baseSchema } as any;

  if (type === 'Organization') {
    schema = {
      ...schema,
      'logo': logo,
      'sameAs': [
        'https://discord.gg/RbRrQY4Pz4',
        'https://youtube.com/@belyxhost',
        'https://www.instagram.com/belyxhost'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        'email': 'support@avixnode.com',
        'url': 'https://billing.avixnode.in/'
      }
    };
  }

  if (type === 'WebSite') {
    schema = {
      ...schema,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  if (type === 'FAQPage' && data?.questions) {
    schema = {
      ...schema,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'mainEntity': data.questions.map((q: any) => ({
        '@type': 'Question',
        'name': q.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': q.answer
        }
      }))
    };
  }

  if (type === 'Product') {
    schema = {
      ...schema,
      'image': data?.image || logo,
      'brand': {
        '@type': 'Brand',
        'name': 'AvixNode'
      },
      'offers': {
        '@type': 'AggregateOffer',
        'lowPrice': data?.minPrice || '1.00',
        'highPrice': data?.maxPrice || '100.00',
        'priceCurrency': data?.currency || 'USD',
        'offerCount': data?.offerCount || '10',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'reviewCount': '1250'
      }
    };
  }

  if (type === 'HowTo' && data?.steps) {
    schema = {
      ...schema,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'step': data.steps.map((step: any, index: number) => ({
        '@type': 'HowToStep',
        'position': index + 1,
        'name': step.title,
        'text': step.instruction,
        'url': `${url}#step${index + 1}`
      }))
    };
  }

  // Speakable schema implementation for generative AI / voice search
  schema['speakable'] = {
    '@type': 'SpeakableSpecification',
    'cssSelector': ['.speakable-content', 'h1', 'h2']
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};
