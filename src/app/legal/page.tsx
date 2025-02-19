export default function LegalPage() {
  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Legal Notice</h1>

        <div className='space-y-8'>
          {/* Service Disclaimer */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Service Disclaimer</h2>
            <p className='text-muted-foreground'>
              Danang Dental Care operates as a connection service that facilitates relationships
              between international patients and dental clinics in Da Nang, Vietnam. We provide
              support services including but not limited to translation, transportation, and
              appointment scheduling.
            </p>
            <p className='text-muted-foreground'>
              While we carefully select our partner clinics and strive to ensure quality service, we
              are not a medical provider and do not perform any dental procedures. All dental
              treatments are provided directly by licensed dental clinics and their professional
              staff.
            </p>
          </section>

          {/* Legal Responsibility */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Legal Responsibility</h2>
            <p className='text-muted-foreground'>
              The legal responsibility for all dental procedures, treatments, and their outcomes
              lies solely with the providing dental clinic. While we will assist our clients in
              communication and support during any dispute resolution, we cannot assume liability
              for any medical outcomes, complications, or dissatisfaction with dental procedures.
            </p>
            <p className='text-muted-foreground'>
              In case of any dental procedure complications or concerns, we will:
            </p>
            <ul className='list-disc pl-6 text-muted-foreground space-y-2'>
              <li>Assist in communication between you and the dental clinic</li>
              <li>Help arrange follow-up appointments if necessary</li>
              <li>Provide translation services during resolution discussions</li>
              <li>Support documentation and communication needs</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Contact Information</h2>
            <p className='text-muted-foreground'>For any legal inquiries, please contact us at:</p>
            <div className='text-muted-foreground'>
              <p>Email: legal@danangdentists.com</p>
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
