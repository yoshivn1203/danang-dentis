export default function PrivacyPage() {
  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Privacy Policy</h1>

        <div className='space-y-8'>
          {/* Data Collection */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Information We Collect</h2>
            <p className='text-muted-foreground'>
              We collect and process personal information solely for the purpose of facilitating
              dental services. This includes:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Contact information for appointment scheduling and communication</li>
              <li>Basic medical history to share with dental providers</li>
              <li>Travel information for transportation services</li>
              <li>Communication records between parties</li>
            </ul>
          </section>

          {/* Data Usage */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>How We Use Your Information</h2>
            <p className='text-muted-foreground'>Your information is used exclusively for:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Facilitating dental appointments and treatments</li>
              <li>Providing translation and transportation services</li>
              <li>Communication regarding your dental care</li>
              <li>Improving our service quality</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Information Sharing</h2>
            <p className='text-muted-foreground'>
              All information is handled with strict confidentiality. We share your information only
              with:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Your chosen dental clinic (with your consent)</li>
              <li>Our transportation and translation service providers (as needed)</li>
              <li>Legal authorities (if required by law)</li>
            </ul>
          </section>

          {/* Customer Rights */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Your Rights</h2>
            <p className='text-muted-foreground'>You have the right to:</p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent for data processing</li>
              <li>Receive a copy of your data</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Privacy Contact</h2>
            <p className='text-muted-foreground'>
              For privacy concerns or to exercise your rights, contact us at:
            </p>
            <div className='text-muted-foreground'>
              <p>Email: privacy@danangdentists.com</p>
              <p>Phone: +84-818-548-409</p>
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
