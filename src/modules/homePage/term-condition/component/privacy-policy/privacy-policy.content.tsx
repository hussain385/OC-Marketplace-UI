import React from 'react';
import { Box } from '@mui/material';
import ListAlphabetOrder from '../order-list-alphabet.component';
import ListCounterOrder from '../order-list-counter.component';
import TermPolicyItems from '../term-policy-item';
import TextContent from '../text.component';

const PrivacyPolicyContent = () => {
  return (
    <TermPolicyItems>
      <TextContent item={<strong>DATA PROTECTION POLICY</strong>} bold />

      <TextContent
        item={
          <span>
            This Data Protection Notice (“<strong>Notice</strong>”) sets out the basis which OpnCorp Pte. Ltd. may collect, use,
            disclose or otherwise process personal data of our customers in accordance with the Personal Data Protection Act (“
            <strong>PDPA</strong>”). This Notice applies to personal data in our possession or under our control, including
            personal data in the possession of organisations which we have engaged to collect, use, disclose or process personal
            data for our purposes. It also applies to all personal data you provide to us when you access our website and when you
            use ourservices.
          </span>
        }
      />

      <TextContent
        item={
          <strong>
            <u>PERSONAL DATA</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' }, marginLeft: { xs: 0, sm: '16px' } }}
        nested={<span>As used in this Notice:</span>}
        data={[
          <span key={1}>
            Depending on the nature of your interaction with us, some examples of personal data which we may collect from you
            include your name and identification information such as your NRIC number, contact information such as your address,
            email address or telephone number, nationality, gender, date of birth, marital status, photographs and other
            audio-visual information, employment information and financial information such as credit card numbers, debit card
            numbers or bank account information.
          </span>,
          <span key={2}>
            Other terms used in this Notice shall have the meanings given to them in the PDPA (where the context so permits).
          </span>,
        ]}
        extraText={[
          <span key={1}>
            &ldquo;<strong>customer</strong>&rdquo;means an individual who (a) has contacted us through any means to find out more
            about any goods or services we provide, or (b) may, or has, entered into a contract with us for the supply of any
            goods or services by us; and
          </span>,
          <span key={2}>
            &ldquo;<strong>personal data</strong>&rdquo; means data, whether true or not, about an individual who can be
            identified from that data or from that data and other information to which we have or are likely to have access.
          </span>,
        ]}
      />

      <TextContent
        item={
          <strong>
            <u>COLLECTION, USE AND DISCLOSURE OF PERSONAL DATA</u>
          </strong>
        }
        bold={true}
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' }, marginLeft: { xs: 0, sm: '16px' } }}
        data={[
          <span key={1}>
            We generally do not collect your personal data unless (a) it is provided to us voluntarily by you directly or via a
            third party who has been duly authorised by you to disclose your personal data to us (your &ldquo;
            <strong>authorised representative</strong>&rdquo;) after (i) you (or your authorised representative) have been
            notified of the purposes for which the data is collected, and (ii) you (or your authorised representative) have
            provided written consent to the collection and usage of your personal data for those purposes, or (b) collection and
            use of personal data without consent is permitted or required by the PDPA or other laws. We shall seek your consent
            before collecting any additional personal data and before using your personal data for a purpose which has not been
            notified to you (except where permitted or authorised by law).
          </span>,
          <span key={2}>We may collect and use your Personal Data for any or all of the following purposes:</span>,
        ]}
        start={4}
      />
      <ListAlphabetOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'performing obligations in the course of or in connection with our provision of the products and/or services requested by you',

          'verifying your identity;',

          'responding to, handling, and processing queries, requests, applications, complaints, and feedback from you;',

          'managing your relationship with us;',

          'processing payment or credit transactions;',

          'to maintain and update internal record keeping;',

          'to share any of your Personal Data with the auditor for external/internal audit and reporting purposes;',

          'sending your marketing information about our products or services including notifying you of our marketing events, initiatives and promotions, membership and rewards schemes and other promotions;',

          'complying with any applicable laws, regulations, codes of practice, guidelines, or rules, or to assist in law enforcement and investigations conducted by any governmental and/or regulatory authority;',

          'to share any of your Personal Data with financial institutions for the purpose of applying and obtaining credit facility(ies), if necessary;',

          'for detecting, investigating and preventing fraudulent, prohibited or illegal activities;',

          'when you communicate with us directly via our customer service centre, or directly via our coworkers within our Company in relation to our products and services (in person, by email, telephone, direct mail or any other means);',

          'participate in surveys and other types of research;',

          'to share any of your Personal Data pursuant to any Agreement of document which you have dulyentered with us for purposes of seeking legal and/or financial advice and/or for purposes of commencing legal action;',

          'transmitting to any unaffiliated third parties including our third party service providers and agents, and relevant governmental and/or regulatory authorities, whether in Singapore or abroad, for the aforementioned purposes;',

          'if you are a candidate for employment when you complete forms in relation to the recruitment and selection process for the purpose of assessment. We may also collect information about you from your nominated referees where you have authorised us to do so;',

          'to carry out verification and background checks as part of any recruitment and selection process in connection with your application for employment with us; and/or',

          'for other purposes required to operate, maintain and better manage our business and your relationship with us, which we notify you of at the time of obtaining your consent; and you agree and consent to us using and processing your Personal Data for the Purposes in the manner as identified in this Policy. If you do not consent to us processing your Personal Data for one or more of the Purposes, please notify us at the contact details below.',
        ]}
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'We may disclose your personal data: (a) where such disclosure is required for performing obligationsin the course of or in connection with our provision of the goods or services requested by you; or (b)to third party service providers, agents and other organisations we have engaged to perform any of the functions listed in clause 5 above for us',
          'The purposes listed in the above clauses may continue to apply even in situations where your relationship with us (for example, pursuant to a contract) has been terminated or altered in any way, for a reasonable period thereafter (including, where applicable, a period to enable us to enforce our rights under any contract with you)',
        ]}
        start={6}
      />

      <TextContent
        item={
          <strong>
            <u>WITHDRAWING YOUR CONSENT</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'The consent that you provide for the collection, use and disclosure of your personal data will remain valid until such time it is being withdrawn by you in writing. You may withdraw consent and request us to stop using and/or disclosing your personal data for any or all of the purposes listed above by submitting your request in writing or via email to our Data Protection Officer at the contact details provided below.',

          'Upon receipt of your written request to withdraw your consent, we may require reasonable time (depending on the complexity of the request and its impact on our relationship with you) for your request to be processed and for us to notify you of the consequences of us acceding to the same, including any legal consequences which may affect your rights and liabilities to us. In general, we shall seek to process your request within ten (10) business days of receiving it.',

          'Whilst we respect your decision to withdraw your consent, please note that depending on the nature and scope of your request, we may not be in a position to continue providing our products or services to you and we shall, in such circumstances, notify you before completing the processing of your request. Should you decide to cancel your withdrawal of consent, please inform us in writing in the manner described in clause 8 above',

          'Please note that withdrawing consent does not affect our right to continue to collect, use and disclose personal data where such collection, use and disclose without consent is permitted or required under applicable laws.',
        ]}
        start={8}
      />

      <TextContent
        item={
          <strong>
            <u>ACCESS TO AND CORRECTION OF PERSONAL DATA</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'If you wish to make (a) an access request for access to a copy of the personal data which we hold about you or information about the ways in which we use or disclose your personal data, or (b) a correction request to correct or update any of your personal data which we hold about you, you may submit your request in writing or via email to our Data Protection Officer at the contact details provided below.',

          'Please note that a reasonable fee may be charged for an access request. If so, we will inform you of the fee before processing your request.',

          '. We will respond to your request as soon as reasonably possible. Should we not be able to respond to your request within thirty (30) days after receiving your request, we will inform you in writing within thirty (30) days of the time by which we will be able to respond to your request. If we are unable to provide you with any personal data or to make a correction requested by you, we shall generally inform you of the reasons why we are unable to do so (except where we are not required to do so under the PDPA).',
        ]}
        start={12}
      />

      <TextContent
        item={
          <strong>
            <u>PROTECTION OF PERSONAL DATA </u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'To safeguard your personal data from unauthorised access, collection, use, disclosure, copying, modification, disposal or similar risks, we have introduced appropriate administrative, physical and technical measures such as up-to-date antivirus protection to secure all storage and transmission of personal data by us, and disclosing personal data both internally and to our authorised third party service providers and agents only on a need-to-know basis.',

          'You should be aware, however, that no method of transmission over the Internet or method of electronic storage is completely secure. While security cannot be guaranteed, we strive to protect the security of your information and are constantly reviewing and enhancing our information security measures. ',
        ]}
        start={15}
      />

      <TextContent
        item={
          <strong>
            <u>ACCURACY OF PERSONAL DATA</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        object={
          'We generally rely on personal data provided by you (or your authorised representative). In order to ensure that your personal data is current, complete and accurate, please update us if there are changes to your personal data by informing our Data Protection Officer in writing or via email at the contact details provided below.'
        }
        start={17}
      />

      <TextContent
        item={
          <strong>
            <u>RETENTION OF PERSONAL DATA</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'We may retain your personal data for as long as it is necessary to fulfil the purpose for which it was collected, or as required or permitted by applicable laws',

          'We will cease to retain your personal data, or remove the means by which the data can be associated with you, as soon as it is reasonable to assume that such retention no longer serves the purpose for which the personal data was collected, and is no longer necessary for legal or business purposes',
        ]}
        start={18}
      />

      <TextContent
        item={
          <strong>
            <u>TRANSFERS OF PERSONAL DATA OUTSIDE OF SINGAPORE</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'Our information technology storage facilities and servers may be located in other jurisdictions outside of Singapore. This may include, but not limited to, instances where your Personal Data may be stored on servers located outside Singapore. In addition, your Personal Data may be disclosed or transferred to entities located outside Singapore or where you access the Site from countries outside Singapore.',

          'We generally do not transfer your personal data to countries outside of Singapore. However, if we do so, we will obtain your consent for the transfer to be made and we will take steps to ensure that your personal data continues to receive a standard of protection that is at least comparable to that provided under the PDPA.',
        ]}
        start={20}
      />

      <TextContent
        item={
          <strong>
            <u>DATA PROTECTION OFFICER </u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        object={
          'You may contact our Data Protection Officer if you have any enquiries or feedback on our personal data protection policies and procedures, or if you wish to make any request, in the following manner:'
        }
        start={22}
      />

      <Box sx={{ width: '90%', marginInline: 'auto', mb: '16px' }}>
        <TextContent
          sx={{ mb: 0 }}
          item={
            <strong>
              <u>Data Protection Officer</u>
            </strong>
          }
        />
        <TextContent
          sx={{ mt: 0, mb: 0 }}
          item={
            <span>
              <strong>Address:</strong> 531 Upper Cross Street, #04-95 Singapore 051531
            </span>
          }
        />
        <TextContent
          sx={{ mt: 0, mb: 0 }}
          item={
            <span>
              <strong>Email Address</strong>: <u>help@opncorp.com</u>
            </span>
          }
        />
      </Box>

      <TextContent
        item={
          <strong>
            <u>COOKIES POLICY</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'We employ an industry standard technology called “cookies”. The cookie is a small piece of information stored on the hard drive of your computer or device for record-keeping purposes and is used by us to track your visits to the Site. Cookies may be used to save your preferences for your ease and convenience when using the Site. Third party advertising networks may issue their separate cookies to your hard drive when serving advertisements.',
          'The type of anonymous click stream data collected by us through the cookies may include your Internet Protocol address, web browser software, date and time of visit to the Site, and whether your requests (including search requests and clicking on links to parts of the Site) were met with success. All such information collected through cookies is not Personal Data and you cannot be identified from this information. Such information is only used for the purpose of managing and creating a better user experience and to identify areas for improvement on the Site',
          'The use of cookies is now an industry standard and you will find them used on most major websites. Most browsers are initially set up to accept cookies. If you prefer, you can reset your browser either to notify you when you have received a cookie or to refuse to accept cookies. You should understand that certain features on the Site will not function properly if you set your browser to not accept cookies.',
        ]}
        start={23}
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        object={'We generally use cookies for the following functions:'}
        start={26}
      />

      <Box sx={{ width: '93%', marginInline: 'auto' }}>
        <ListCounterOrder
          sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
          type='a'
          data={[
            <span key={1}>
              <u>Strictly necessary cookies:</u> We use these cookies to enable you to use our Platforms’ essential features.
              These include security cookies which we use to authenticate users and protect your data. If these cookies are
              disabled, you may not be able to use our Platforms or some of their features.
            </span>,
            <span key={2}>
              <u>Functionality cookies:</u> We use these cookies to enhance your experience when using our Platforms by storing
              your preferences, such as your preferred language or region.
            </span>,
            <span key={3}>
              <u>Performance cookies:</u> These cookies allow us to measure how often you visit our sites and how you use them. We
              use this information to get a better sense of how our users engage with our journalism and to improve our sites and
              apps, so that users have a better experience. For example, we collect information about which of our pages are most
              frequently visited, and by which types of users.
            </span>,
          ]}
        />
      </Box>

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        object={'The information collected by such cookies is aggregated and cannot be used to personally identify you.'}
        start={27}
      />

      <Box sx={{ width: '93%', marginInline: 'auto' }}>
        <ListCounterOrder
          sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
          type='a'
          object={
            <span>
              <u>Other cookies placed by third-parties:</u> Some of our Platforms may contain pages which contain embedded
              functions, social media tools or links supplied by third-parties (forexample, videos may sometimes be embedded from
              YouTube). These functions or links may contain third-party cookies. Please consult the privacy policies of these
              third-parties for information regarding the use of their cookies or other automated data collection tools.
            </span>
          }
        />
      </Box>

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        object={
          'We will only use non-essential cookies (i.e. performance cookies, targeting cookies and thirdparties’ cookies) if you have given prior consent in accordance with the information contained in the pop-up box of your browser or device when you access a Platform for the first time.If you wish to withdraw your consent at any time, you must delete your cookies using your browser settings and disable the relevant cookies.'
        }
        start={28}
      />

      <TextContent
        item={
          <strong>
            <u>EFFECT OF NOTICE AND CHANGES TO NOTICE</u>
          </strong>
        }
        bold
      />

      <ListCounterOrder
        sx={{ paddingLeft: { xs: 0, sm: '40px' } }}
        data={[
          'This Notice applies in conjunction with any other notices, contractual clauses and consent clauses that apply in relation to the collection, use and disclosure of your personal data by us.',
          'We may revise this Notice from time to time without any prior notice. You may determine if any such revision has taken place by referring to the date on which this Notice was last updated. Your continued use of our services constitutes your acknowledgement and acceptance of such changes. ',
        ]}
        start={23}
      />

      <TextContent item={'Date of issuance of this Personal Data Protection Policy: 10 February 2022'} />
    </TermPolicyItems>
  );
};

export default PrivacyPolicyContent;
