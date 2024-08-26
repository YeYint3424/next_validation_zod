import "./globals.css";
export const metadata = {
  title: "NextJS Form Validation with Zod",
  description: "Learn about NextJS Form Validation with Zod",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};
export default MainLayout;
