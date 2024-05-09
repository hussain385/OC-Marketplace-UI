import React from 'react';
import { Box } from '@mui/material';
import ListAlphabetOrder from '../order-list-alphabet.component';
import ListDecimalCounterOrder from '../order-list-counter-decimal.component';
import ListCounterOrder from '../order-list-counter.component';
import TermPolicyItems from '../term-policy-item';
import TextContent from '../text.component';

const TermsConditionsContent = () => {
  return (
    <TermPolicyItems
      sx={{
        padding: { xs: '0 0 0 20px', sm: '0 37px' },
        mt: '16px ',
        position: 'relative',
      }}
    >
      <TextContent
        item={
          <strong>
            <u>T&Cs for buyers & sellers on the platform</u>
          </strong>
        }
        bold
      />
      <ListDecimalCounterOrder
        data={[
          'Welcome to the opncorp.com.sg website (the “Platform”). These Terms of Use govern your access and use of the Platform and the use of any services, information and functions made available by us at the Platform (“Services”). Before using this Platform or the Services, you must read carefully and accept these Terms of Use and all other terms and conditions and policies pertaining to the use of the Platform and/or the Services (collectively referred to as “OpnCorp Terms and Conditions”) and you must consent to the processing of your personal data as described in the Privacy Policy set out at “opncorp.com”. By accessing the Platform and/or using the Services, you agree to be bound by OpnCorp Terms and Conditions and any amendments to the foregoing issued by us from time to time. If you do not agree to OpnCorp Terms and Conditions and the Privacy Policy, do not access and/or use this Platform and/or the Services.',
          'The Terms of Use stated herein constitute a legal agreement between you and OpnCorp Pte. Ltd. (UEN No.: 202202541D), a company incorporated in Singapore and having its registered address at 531A Upper Cross Street, #04-95, Hong Lim Complex, Singapore 051531 (“OpnCorp”, “we”, “us” or “our”).',
          'OpnCorp reserves the right, to change, modify, add, or remove portions of these Terms of Use and/or OpnCorp Terms and Conditions at any time. Changes will be effective when posted on the Platform with no other notices provided and you are deemed to be aware of and bound by any changes to the foregoing upon their publication on the Platform.',
          'if you are under the age of 18 or the legal age for giving consent hereunder pursuant to the applicable laws in your country (the “legal age”), you must obtain permission from your parent(s) or legal guardian(s) to open an account on the Platform. If you are the parent or legal guardian of a minor who is creating an account, you must accept and comply with these Terms of Use on the minor &apos; behalf and you will be responsible for the minor’s actions, any charges associated with the minor’s use of the Platform and/or Services or purchases made on the Platform. If you do not have consent from your parent(s) or legal guardian(s), you must stop using/accessing this Platform and/or Services.',
        ]}
      />
      <ListCounterOrder
        sx={{ paddingLeft: '0', margin: 0 }}
        object={<span>USE OF THE PLATFORM AND/OR SERVICES</span>}
        start={2}
      />
      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 1' }}
        data={[
          'We grant you a non-transferable and revocable license to use the Platform and/or Services, subject to these Terms of Use, for the purpose of shopping for products sold on the Platform. Commercial use or use on behalf of any third party is prohibited, except as explicitly permitted by us in advance. Any breach of these Terms of Use shall result in the immediate revocation of the license granted herein without notice to you.',
          'Content provided on this Platform is solely for informational purposes. Product representations expressed on this Platform are those of the vendor and are not made by us. Submissions or opinions expressed on this Platform are those of the individual posting such content and may not reflect our opinions.',
          'Certain services and related features that may be made available on the Platform may require registration or subscription. Should you choose to register or subscribe for any such services or related features, you agree to provide accurate and current information about yourself, and to promptly update such information if there are any changes. Every user of the Platform is solely responsible for keeping passwords and other account identifiers safe and secure. The account owner is entirely responsible for all activities that occur under such password or account. Furthermore, you must notify us of any unauthorized use of your password or account. OpnCorp shall not be responsible or liable, directly or indirectly, in any way for any loss or damage of any kind incurred as a result of, or in connection with, your failure to comply with this section.',
          'We may, from time to time and without giving any reason or prior notice, upgrade, modify, suspend or discontinue the provision of or remove, whether in whole or in part, the Platform or any Services and shall not be liable if any such upgrade, modification, suspension or removal prevents you from accessing the Platform or any part of the Services.',
          'We reserve the right, but shall not be obliged to:',
        ]}
      />
      <ListAlphabetOrder
        sx={{ margin: 0, paddingLeft: '0' }}
        data={[
          'monitor, screen or otherwise control any activity, content or material on the Platform and/or through the Services. We may in our sole and absolute discretion, investigate any violation of these Terms of Use contained herein and may take any action it deems appropriate;',
          'prevent or restrict access of any an authorised user to the Platform and/or the Services;',
          'report any activity it suspects to be in violation of any applicable law, statute or regulation to the appropriate authorities and to co-operate with such authorities; and/or',
          'to request any information and data from you in connection with your use of the Services and/or access of the Platform at any time and to exercise our right under this paragraph if you refuse to divulge such information and/or data or if you provide or if we have reasonable grounds to suspect that you have provided inaccurate, misleading or fraudulent information and/or data.',
        ]}
      />
      <ListDecimalCounterOrder
        counter={'2.6'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'Third-Party Vendors: You acknowledge that parties other than OpnCorp (i.e., Third-Party Vendors) list and sell Products on the Platform. Whether a particular Product is listed for sale on the Platform by OpnCorp or a Third-Party Vendor may be stated on the webpage listing that Product. For the avoidance of doubt, each agreement entered for the sale of a Third-Party Vendor’s Products to a Customer shall be an agreement entered into directly and only between the Third-Party Vendor and the Customer. You further acknowledge that Third Party Vendors may utilise paid services offered by OpnCorp to occupy certain product listings slots within your search results on the Platform. Such Product listing may be accompanied by a logo.'
        }
      />
      <ListCounterOrder
        sx={{ paddingLeft: '0', margin: 0 }}
        object={
          'You grant us a non-exclusive licence to use the materials or information that you submit to the Platform and/or provide to us, including but not limited to, questions, reviews, comments, and suggestions (collectively, "Submissions"). When you post comments or reviews to the Platform, you also grant us the right to use the name that you submit or your username, in connection with such review, comment, or other content. You shall not use a false e-mail address, pretend to be someone other than yourself or otherwise mislead us or third parties as to the origin of any Submissions. We may, but shall not be obligated to remove or edit any Submissions.'
        }
        start={3}
      />
      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'TRADEMARKS AND COPYRIGHTS'} start={4} />
      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 3' }}
        data={[
          'All intellectual property rights, whether registered or unregistered, in the Platform, information content on the Platform and all the website design, including, but not limited to, text, graphics, software, photos, video, music, sound, and their selection and arrangement, and all software compilations, underlying source code and software (collectively referred to as “Intellectual Property”) shall remain our property or where applicable, our affiliates or third party intellectual property owners. The entire contents of the Platform also are protected by copyright as a collective work under Singapore copyright laws and international conventions. All rights are reserved.',
          'No part or parts of the Platform may be reproduced, reverse engineered, decompiled, disassembled, separated, altered, distributed, republished, displayed, broadcasted, hyperlinked, mirrored, framed, transferred or transmitted in any manner or by any means or stored in an information retrieval system or installed on any servers, system or equipment any Intellectual Property without our prior written permission or that of the relevant Intellectual Property owners. No party accessing the Platform shall claim any right, title or interest therein. Permission will only be granted to you to download, print or use the Intellectual Property for personal and non-commercial uses, provided that you do not modify the Intellectual Property and that we or the relevant copyright owners retain all copyright and other proprietary notices contained in the Materials.',
        ]}
      />
      <ListCounterOrder
        sx={{ paddingLeft: '0', margin: 0 }}
        object={'Our limitation of responsibility and liability'}
        start={5}
      />
      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 4' }}
        data={[
          'The Platform and all data and/or information contained therein and/or the Services are provided on an “as is” and “as available” basis without any warranties, claims or representations made by OpnCorp of any kind either expressed, implied or statutory with respect to the Platform and/or the Services, including, without limitation, warranties of non-infringement of third-party rights, title, merchantability, satisfactory quality or fitness for a particular purpose. All data and/or information contained in the Platform and/or the Services are provided for informational purposes only.',
          'Without limiting the foregoing, OpnCorp does not warrant that the Platform and/or the Services or the functions contained therein will be available, accessible, uninterrupted, timely, secure, accurate, complete or error-free, that defects, if any, will be corrected, or that this Platform and/or the server that makes the same available are free of viruses, clocks, timers, counters, worms, software locks, drop dead devices, trojan-horses, routings, trap doors, time bombs or any other harmful codes, instructions, programs or components',
          'OpnCorp and all its respective officers, employees, directors, agents, contractors and assigns shall not be liable to you for any losses whatsoever or howsoever caused (regardless of the form of action) arising directly or indirectly in connection with:',
        ]}
      />
      <ListAlphabetOrder
        sx={{ margin: 0, paddingLeft: '0' }}
        data={[
          ' any access, use and/or inability to use the Platform or the Services;',
          'reliance on any data or information made available through the Platform and/or through the Services. You should not act on such data or information without first independently verifying its contents;',
          'any system, server or connection failure, error, omission, interruption, delay in transmission, computer virus or other malicious, destructive or corrupting code, agent program or macros; and',
          'any use of or access to any other website or webpage linked to the Platform, even if we or our officers or agents or employees may have been advised of, or otherwise might have anticipated, the possibility of the same.',
        ]}
      />
      <ListDecimalCounterOrder
        counter={'5.4'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'Any risk of misunderstanding, error, damage, expense or losses resulting from the use of the Platform and/or Services is entirely at your own risk, and we shall not be liable therefore.'
        }
      />

      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'HYPERLINKS'} start={6} />
      <ListDecimalCounterOrder
        counter={'6.1'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'For your convenience, we may include hyperlinks to other websites or content on the Platform that are owned or operated by third parties. Such linked websites or content are not under our control and we are not liable for any errors, omissions, delays, defamation, libel, slander, falsehood, obscenity, pornography, profanity, inaccuracy or any other objectionable material contained in the contents, or the consequences of accessing, any linked website. Any hyperlinks to any other websites or content are not an endorsement or verification of such websites or content and you agree that your access to or use of such linked websites or content is entirely at your own risk'
        }
      />

      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'PAYMENT'} start={7} />
      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 6' }}
        data={[
          'General: You may pay for the Product using any of the payment methods prescribed by OpnCorp from time to time. When you place an Order, actual payment will be only charged upon Seller’s acceptance of your Order and formation of a Customer Contract. All payments shall be made to OpnCorp, either accepting payment in its own right or as Seller’s agent (where Seller is a Third-Party Vendor). You acknowledge that OpnCorp is entitled to collect payments from you on behalf of ThirdParty Vendors.',
          'Additional Terms: The payment methods may be subject to additional terms as prescribed by OpnCorp from time to time',
          'Payment Methods: You agree that you are subject to the applicable user agreement of your payment method. You may not claim against Seller or any of its agents (which may include OpnCorp), for any failure, disruption or error in connection with your chosen payment method. OpnCorp reserves the right at any time to modify or discontinue, temporarily or permanently, any payment method without notice to you or giving any reason.',
          'Payment by PayNow QR Code: If you use PayNow QR Code to make payment, your use of the PayNow QR Code is subject to the following terms:',
        ]}
      />
      <ListAlphabetOrder
        sx={{ margin: 0, paddingLeft: '0' }}
        data={[
          'You shall scan the PayNow QR Code only once to prevent duplicates. For duplicate top-ups, OpnCorp will issue the refund to you through such method as notified to you at the relevant time;',
          'the PayNow QR Code is only valid for a limited period in accordance with the time period stated on the QR Code page.',
          'In the event that your PayNow transfer is automatically reversed through no fault of OpnCorp, OpnCorp reserves the right to claim or clawback such amounts which is mistakenly recorded directly from you.',
          'The goods and services eligible for purchase via PayNow are subject to change in OpnCorp’s sole discretion. If your order contains ineligible items, please select another valid payment method e.g., credit card, to pay for the order.',
        ]}
      />
      <ListDecimalCounterOrder
        counter={'7.5'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={'Invoicing: Seller may invoice you upon the due date of any payment under a Customer Contract.'}
      />
      <ListDecimalCounterOrder
        counter={'7.6'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'Failure to pay: If the Customer fails to make any payment pursuant to the terms and conditions of the payment method elected or payment is cancelled for any reason whatsoever, then without prejudice to any other right or remedy available to Seller, Seller shall be entitled to cancel the Customer Contract or suspend delivery of the Products until payment is made in full.'
        }
      />

      <ListDecimalCounterOrder
        counter={'7.7'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={'Refund of Payment:'}
      />
      <ListAlphabetOrder
        sx={{ margin: 0, paddingLeft: '0' }}
        data={[
          'All refunds shall be made via the original payment mechanism and to the person who made the original payment, provided that such refund is processed within 60 days from the time payment was successfully completed.',
          'We offer no guarantee of any nature for the timeliness of the refunds reaching your account. The processing of payment may take time and it is subject to the respective banks and/or payment provider internal processing timeline',
          'All costs associated with the refund process imposed by the processing bank and/or payment provider shall be borne by us.',
          'All refunds are conditional upon our acceptance of a valid return of the Product.',
          'We reserve the right to modify the mechanism of processing refunds at any time without notice.',
        ]}
      />
      <ListDecimalCounterOrder
        counter={'7.8'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'Card payments are processed through third-party payment channels and the type of credit cards accepted by these payment channels may vary depending on the jurisdiction you are in.'
        }
      />
      <ListDecimalCounterOrder
        counter={'8'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={'DISPUTES AND CANCELLATIONS'}
      />
      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 7' }}
        data={[
          'All returns must be done in accordance with the instructions set out in OpnCorp SG Refund Policy. Customer may initiate the refund process by communicating with Seller or OpnCorp through the Platform, as the case may be. Seller or OpnCorp is not obliged to agree to any refund unless all such instructions are followed to Seller’s and OpnCorp’s satisfaction. Customer acknowledges that a refund may be rejected if such instructions are not strictly adhered to. OpnCorp reserves the right to reject any requests for refund at its sole discretion, including without limitation, where it deems that any transaction is fraudulent or suspects that it is fraudulent. 8.2 Order cancellations can be performed on OpnCorp, when eligible, by Customer Support or through the resolution centre per order.',
          'Order cancellations can be performed on OpnCorp, when eligible, by Customer Support or through the resolution centre per order.',
          'Filing a transaction dispute or reversing a payment through OpnCorp payment provider or bank is a violation of these payment terms. OpnCorp, through its payment services provider, reserves the right to cancel orders or place funds on hold for any suspected fraudulent transactions made on the website.',
          'We encourage our Buyers and Sellers to try and settle conflicts amongst themselves. If for any reason this fails, users can contact OpnCorp&apos;s Customer Support department for assistance.',
          'OpnCorp Customer Support will cancel orders based on, but not limited to, the following reasons:',
        ]}
      />

      <TextContent
        sx={{ fontSize: '14px' }}
        item={
          <span>
            <strong>Active orders</strong> (after requirements were submitted to the Seller and before the Seller delivers on
            OpnCorp):
          </span>
        }
      />
      <Box sx={{ width: '93%', marginInline: 'auto' }}>
        <ListCounterOrder
          sx={{ paddingLeft: '14px', margin: 0 }}
          data={[
            'The Seller is late and unresponsive for more than 24 hours while the order is marked as Late.',
            'Users are abusive towards the other party through threats of low ratings or leveraging order materials (such as logins, personal information) against each other.',
            'Users supplied or included copyright/trademark infringing materials as part of their requirements or the Seller’s delivery.',
            'The user is no longer an active OpnCorp user due to Terms of Service violations or closure of their account.',
          ]}
        />
      </Box>

      <TextContent
        sx={{ fontSize: '14px' }}
        item={
          <span>
            <strong>Delivered Orders</strong> (after the Seller clicks Deliver Now and before the order is marked as complete)
          </span>
        }
      />
      <Box sx={{ width: '93%', marginInline: 'auto' }}>
        <ListCounterOrder
          sx={{ paddingLeft: '0', margin: 0 }}
          data={[
            [
              'Users who have been reported to use copyright/trademark infringing materials after verification and with proof.',
              'Users who did not purchase commercial use rights and are reported to have used the materials commercially. Note: Terms of Commercial use are found on the Seller’s Gig Page and cannot be retroactively included once the order is completed for over 14 days',
              'OpnCorp Customer Support will review cases of Order delivery manipulation that prevents users from fully utilizing our Resolution Centre that enabled the order to be marked as complete.',
            ],
          ]}
          start={5}
        />
      </Box>

      <TextContent
        sx={{ fontSize: '14px' }}
        item={
          <span>
            <strong>Completed Orders</strong> (after the order is marked as complete and before the 14-day limitation)
          </span>
        }
      />
      <Box sx={{ width: '93%', marginInline: 'auto' }}>
        <ListCounterOrder
          sx={{ paddingLeft: '0', margin: 0 }}
          data={[
            'Users who have been reported to use copyright/trademark infringing materials after verification and with proof.',
            'Users who did not purchase commercial use rights and are reported to have used the materials commercially. Note: Terms of Commercial use are found on the Seller’s Gig Page and cannot be retroactively included once the order is completed for over 14 days',
            'OpnCorp Customer Support will review cases of Order delivery manipulation that prevents users from fully utilizing our Resolution Centre that enabled the order to be marked as complete.',
          ]}
          start={11}
        />
      </Box>

      <ListDecimalCounterOrder
        counter={'8.6'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'Any non-permitted usage of OpnCorp encountered during an Order, after being reviewed by our Customer Support team, may result in the order being cancelled. This includes, but not limited to; harassment, unlawful behavior, or other violations of OpnCorp’s Terms of Service.'
        }
      />
      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'APPLICATION LAW AND JURISDICTION'} start={9} />

      <ListDecimalCounterOrder
        counter={'9.1'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'These Terms of Use and/or other OpnCorp Terms and Conditions shall be interpreted and governed by the laws in force in Singapore. Subject to the section on Arbitration below, you hereby agree to submit to the jurisdiction of the Courts of Singapore.'
        }
      />
      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'ARBITRATION'} start={10} />

      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 9' }}
        data={[
          'Any controversy, claim or dispute arising out of or relating to these Terms of Use and/or other OpnCorp Terms and Conditions or the breach, termination or invalidity thereof shall be referred to and settled by arbitration in accordance with the Arbitration Rules of the Asian International Arbitration Centre (“AIAC) held in Singapore. The arbitral tribunal shall consist of a sole arbitrator who is legally trained and who has experience in the information technology field in Singapore and is independent of either party. The place of arbitration shall be Singapore. Any award by the arbitration tribunal shall be final and binding upon the parties.',
          'Notwithstanding the foregoing, OpnCorp reserves the right to pursue the protection of intellectual property rights and confidential information through injunctive or other equitable relief through the courts.',
        ]}
      />
      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'TERMINATION'} start={11} />
      <ListDecimalCounterOrder
        counter={'11.1'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'In addition to any other legal or equitable remedies, we may, without prior notice to you, immediately terminate or revoke any or all your rights granted under these Terms of Use and/or other OpnCorp Terms and Conditions. Upon any termination of these Terms of Use and/or other OpnCorp Terms and Conditions, you shall immediately cease all access to and use of the Platform and/or Services and we shall, in addition to any other legal or equitable remedies, immediately revoke all password(s) and account identification issued to you and deny your access to and use of this Platform and/or Services in whole or in part. Any termination of this agreement shall not affect the respective rights and obligations (including without limitation, payment obligations) of the parties arising before the date of termination. You furthermore agree that OpnCorp shall not be liable to you or to any other person as a result of any such suspension or termination. If you are dissatisfied with the Platform and/or Services or with any terms, conditions, rules, policies, guidelines, or practices of OpnCorp, in operating the Platform and/or providing Services, your sole and exclusive remedy is to discontinue using the Platform and/or the Services.'
        }
      />

      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'USER GENERATED CONTENT'} start={12} />
      <ListDecimalCounterOrder
        sx={{ counterReset: 'item 11', paddingLeft: '0' }}
        data={[
          'User Generated Content ("UGC") refers to the content added by users as opposed to content created by the Platform. All content uploaded to OpnCorp by our users (Buyers and Sellers) is User Generated Content. OpnCorp does not check user uploaded/created content for appropriateness, violations of copyright, trademarks, other rights or violations and the user uploading/creating such content shall be solely responsible for it and the consequences of using, disclosing, storing, or transmitting it. By uploading to, or creating content on, the OpnCorp platform, you represent and warrant that you own or have obtained all rights, licenses, consents, permissions, power and/or authority, necessary to use and/or upload such content and that such content or the use thereof in the Platform does not and shall not (a) infringe or violate any intellectual property, proprietary or privacy, data protection or publicity rights of any third party; (b) violate any applicable local, state, federal and international laws, regulations and conventions; and/or (c) violate any of your or third party’s policies and/or terms of service. We invite everyone to report violations together with proof of ownership as appropriate. Reported violating content may be removed or disabled.',
          'By acceptance of these User-Generated Websites Terms and Conditions, you agree that any information you provide about yourself is accurate and complete information at the time provided. In particular, you represent that you are 18 years of age or older. In addition, you agree to update any information provided to User-Generated Websites to keep it accurate and complete. Your failure to accurately and completely provide, and timely update, information about yourself is reasonable grounds for suspension or termination of your account in OpnCorp',
          'Furthermore, OpnCorp will not be responsible for the content, quality or the level of service provided by the Sellers. We encourage users to take advantage of our rating system, our community and common sense in choosing appropriate services',
          'By offering a service, the Seller undertakes that he/she has sufficient permissions, rights and/or licenses to provide, sell or resell the service that is offered on OpnCorp.',
          'We reserve the right to modify or terminate any User-Generated Content or service therein for any reason, and without notice, without liability to you, any other Sellers, or any third party. We also reserve the right to modify these Terms and Conditions for User-Generated Content from time to time without notice. You are responsible for regularly reviewing these Terms and Conditions for UserGenerated Content so that you will be apprised of any changes.',
          'We also reserve the right in our sole discretion to refuse, edit, and/or remove any content that may be deemed by any User-Generated Website community to be inappropriate without providing you notice.',
        ]}
      />

      <ListCounterOrder sx={{ paddingLeft: '0', margin: 0 }} object={'DISCLAIMERS'} start={13} />

      <ListDecimalCounterOrder
        counter={'13.1'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'The services are provided "as is" and without any warranties, claims or representations made by OpnCorp of any kind either expressed, implied or statutory with respect to the services, including, without limitation, warranties of quality, performance, non-infringement, merchantability, or fitness for a particular purpose, nor are there any warranties created by course of dealing, course of performance or trade usage. Without limiting the foregoing and to the maximum extent permitted by applicable law, OpnCorp does not warrant that the services, this site or the functions contained therein will be available, accessible, uninterrupted, timely, secure, accurate, complete or error-free, that defects, if any, will be corrected, or that this site and/or the server that makes the same available are free of viruses, clocks, timers, counters, worms, software locks, drop dead devices, trojan-horses, routings, trap doors, time bombs or any other harmful codes, instructions, programs or components'
        }
      />
      <ListDecimalCounterOrder
        counter={'13.1'}
        customListStyles={{
          '&::before': {
            content: 'attr(data-counter)',
          },
        }}
        object={
          'You acknowledge that the entire risk arising out of the use or performance of the site and/or the services remains with you to the maximum extent permitted by applicable law.'
        }
      />
    </TermPolicyItems>
  );
};

export default TermsConditionsContent;
