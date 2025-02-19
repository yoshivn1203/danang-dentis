export default function TermsPage() {
  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Terms of Service</h1>

        <div className='space-y-8'>
          {/* Service Overview */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>1. Service Overview</h2>
            <p className='text-muted-foreground'>
              Danang Dental Care provides a connection service between international patients and
              dental clinics in Da Nang, Vietnam. Our services include:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Dental clinic recommendations and appointments</li>
              <li>Translation services during consultations and procedures</li>
              <li>Transportation to and from dental appointments</li>
              <li>General support and coordination throughout your dental care journey</li>
            </ul>
          </section>

          {/* Service Terms */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>2. Service Terms</h2>
            <p className='text-muted-foreground'>By using our services, you agree to:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Provide accurate and complete medical information</li>
              <li>Attend scheduled appointments or provide 24-hour notice of cancellation</li>
              <li>Pay for dental services directly to the dental clinic</li>
              <li>Follow pre and post-treatment instructions provided by the dental clinic</li>
              <li>Communicate any concerns or issues promptly</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>3. Payment and Fees</h2>
            <p className='text-muted-foreground'>Our payment terms are as follows:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Service fees are charged separately from dental treatment costs</li>
              <li>Dental treatment costs are paid directly to the dental clinic</li>
              <li>Cancellation fees may apply for late notice cancellations</li>
              <li>Payment methods include credit card, bank transfer, and cash</li>
            </ul>
          </section>

          {/* Cancellation Policy */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>4. Cancellation Policy</h2>
            <p className='text-muted-foreground'>Our cancellation policy includes:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>24-hour notice required for appointment cancellations</li>
              <li>Rescheduling is subject to clinic availability</li>
              <li>Late cancellations may incur a fee</li>
              <li>Emergency cancellations are handled on a case-by-case basis</li>
            </ul>
          </section>

          {/* Liability */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>5. Liability and Disclaimers</h2>
            <p className='text-muted-foreground'>Please understand that:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>We are not a medical provider and do not provide dental treatment</li>
              <li>All dental procedures are performed by independent dental clinics</li>
              <li>
                Medical outcomes and complications are the responsibility of the treating clinic
              </li>
              <li>Travel insurance and medical insurance are recommended</li>
              <li>We will assist with communication in case of complications or concerns</li>
            </ul>
          </section>

          {/* Service Modifications */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>6. Service Modifications</h2>
            <p className='text-muted-foreground'>We reserve the right to:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Modify our services and fees with notice</li>
              <li>Update these terms of service</li>
              <li>Decline service at our discretion</li>
              <li>Change service providers when necessary</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>7. Contact Information</h2>
            <p className='text-muted-foreground'>For questions about these terms, contact us at:</p>
            <div className='text-muted-foreground'>
              <p>Email: support@danangdentists.com</p>
              <p>Phone: +84-818-548-409</p>
              <p>Address: [Your Business Address in Da Nang]</p>
            </div>
          </section>

          {/* Last Updated */}
          <div className='pt-8 border-t'>
            <p className='text-sm text-muted-foreground'>
              Last Updated:{' '}
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
