import PrivacyContactAndAcceptance from "./(components)/PrivacyContactAndAcceptance";
import PrivacyHero from "./(components)/PrivacyHero";
import PrivacyInformation from "./(components)/PrivacyInformation";
import PrivacySecurityAndRights from "./(components)/PrivacySecurityAndRights";
import PrivacyUsageAndCookies from "./(components)/PrivacyUsageAndCookies";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-background">
      <PrivacyHero />
      <PrivacyInformation />
      <PrivacyUsageAndCookies />
      <PrivacySecurityAndRights />
      <PrivacyContactAndAcceptance />
    </main>
  );
};

export default PrivacyPage;