import TermsContactAndAcceptance from "./(components)/TermsContactAndAcceptance";
import TermsHero from "./(components)/TermsHero";
import TermsLegal from "./(components)/TermsLegal";
import TermsOrdersAndContent from "./(components)/TermsOrdersAndContent";
import TermsOverview from "./(components)/TermsOverview";

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <TermsHero />
      <TermsOverview />
      <TermsOrdersAndContent />
      <TermsLegal />
      <TermsContactAndAcceptance />
    </main>
  );
};

export default TermsPage;