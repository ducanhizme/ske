import Image from "next/image";
import { Layout } from "../src/components/common/layout/Layout";
import { Button, Card } from "../src/components/ui";

export default function Home() {
  return (
    <Layout title="SKE - Home">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Image
            className="mx-auto mb-4"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SKE
          </h1>
          <p className="text-lg text-gray-600">
            A Next.js skeleton application with client-side rendering and modular architecture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card title="Components">
            <p className="text-gray-600 mb-4">
              Modular UI components built with Tailwind CSS and TypeScript.
            </p>
            <Button variant="primary">Explore Components</Button>
          </Card>

          <Card title="Services">
            <p className="text-gray-600 mb-4">
              Global services for API calls, storage, and validation.
            </p>
            <Button variant="secondary">View Services</Button>
          </Card>

          <Card title="Architecture">
            <p className="text-gray-600 mb-4">
              Bottom-up architecture with clear separation of concerns.
            </p>
            <Button variant="success">Learn More</Button>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>
              Get started by editing{" "}
              <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                pages/index.tsx
              </code>
            </li>
            <li>Save and see your changes instantly with CSR</li>
            <li>Explore the modular component architecture</li>
            <li>Build your application using the provided structure</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
