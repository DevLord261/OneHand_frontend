import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ComboboxDemo } from "~/components/ComboBoxDemo";
import { DatePickerDemo } from "~/components/DatePicker";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import styles from "~/styles/CreateCampaign.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const API_URL = process.env.REACT_APP_API_URL;
  if (intent == "nextstep") {
    const title = formData.get("Title") as string;
    const donation = formData.get("donation") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const country = formData.get("country") as string;
    const city = formData.get("city") as string;
    const location = `${country},${city}`;

    const errors: Record<string, string> = {};

    if (Object.keys(errors).length > 0) {
      return json({ success: false, errors, step: 1 }, { status: 400 });
    }

    if (!title || !donation || !category || !date || !country || !city) {
      errors.missing = "Please fill all required inputs";
    }

    return json({
      success: true,
      step: 2,
      campaignData: { title, donation, category, date, location },
    });
  } else if (intent == "submit") {
    return json({ success: true, step: 2 });
  }
}
export default function CreateCampaign() {
  const [currentStep, setStep] = useState(1);
  const [selectedcategory, setcategory] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success && actionData?.step == 2) {
      setStep(2);
    }
  }, [actionData]);
  return (
    <main className="main">
      <div className=" container">
        <h2 className="text-2xl font-bold text-gray-900">Basic Info</h2>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <span className="text-gray-800 font-medium">Basic Info</span>
          </div>
          <div className="w-px h-5 bg-gray-300" />
          <div className="flex items-center gap-2 text-gray-400">
            <div
              className={`h-1 w-16 ${
                currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              2
            </div>
            <span className="">Description</span>
          </div>
        </div>
      </div>
      <div className="boxcontainer">
        {currentStep <= 1 ? (
          <Form className="info" method="POST">
            <input type="hidden" name="intent" value={"nextstep"} />
            <input type="hidden" name="category" value={selectedcategory} />
            <input
              type="hidden"
              name="date"
              value={
                selectedDate ? selectedDate.toISOString().split("T")[0] : ""
              }
            />
            <div className="title labelspace">
              <Label htmlFor="Title">Campaign Title</Label>
              <Input type="text" name="Title" placeholder="Title" required />
            </div>
            <div className="donation labelspace">
              <Label htmlFor="donation">donation goal</Label>
              <Input
                type="number"
                name="donation"
                placeholder="donationgoal"
                required
              />
            </div>
            <div className="category labelspace">
              <Label htmlFor="category">Category</Label>
              <ComboboxDemo
                value={selectedcategory}
                onValueChange={setcategory}
              />
            </div>

            <div className="date labelspace">
              <Label htmlFor="date">campaign finish Date</Label>
              <DatePickerDemo
                value={selectedDate}
                onValueChange={setSelectedDate}
              />
            </div>
            <div className="country labelspace">
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                name="country"
                placeholder="Country"
                required
              />
            </div>
            <div className="city labelspace">
              <Label htmlFor="city">City</Label>
              <Input type="text" name="city" placeholder="City" required />
            </div>
            <div className="nextbtn">
              <Button
                type="submit"
                variant="secondary"
                size="icon"
                className="size-8 "
              >
                Next
                <ChevronRightIcon />
              </Button>
            </div>
          </Form>
        ) : (
          <Form>
            <input value={"submit"} name="intent" type="hidden" />
          </Form>
        )}
      </div>
    </main>
  );
}
