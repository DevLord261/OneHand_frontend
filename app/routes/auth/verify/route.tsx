import styles from "~/styles/Login.module.css";
import clsx from "clsx";
import { Form, useSearchParams } from "@remix-run/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { ActionFunctionArgs } from "@remix-run/node";

export async function loader({ request }: { request: Request }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    console.warn("No email in query params");
    return new Response("Missing email", { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/users/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      console.error("Failed to send email", res.status);
      return new Response("Failed to send email", { status: res.status });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error in loader:", e);
    return new Response("Internal server error", { status: 500 });
  }
}

export async function action() {
  // { request }: ActionFunctionArgs
  // const formData = await request.formData();
  const API_URL = process.env.REACT_APP_API_URL;
  // const code = formData.get("code");
  // console.log(code);
  try {
    const res = await fetch(`${API_URL}/users/verify-code`, {
      method: "POST",
      body: JSON.stringify({ email: "hsenbyomi@gmail.com", code: "711562" }),
    });
  } catch (e) {
    console.error(e);
  }
}

export default function Verify() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();

  return (
    <Form className="min-h-screen flex items-center justify-center !p-4 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 ">
      <input type="hidden" value={code} name="code" />
      <Card className="w-full max-w-md shadow-2xl border-0 !p-4">
        <CardHeader className="text-center space-y-4 !pb-8 flex items-center justify-center flex-col !p-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div className="!space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              We`&apos`ve sent a 6-digit verification code to your email
              address. Please enter it below to continue.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <Label className="text-sm font-medium text-gray-700 block !mb-3">
                Enter verification code
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    <InputOTPSlot
                      index={2}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    <InputOTPSlot
                      index={4}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                    <InputOTPSlot
                      index={5}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              type="submit"
              disabled={code.length !== 6 || isLoading}
              className="w-full !mt-14 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </div>

          <div className="text-center space-y-4 !mt-8">
            <p className="text-sm text-gray-600">
              {"Didn't receive the code?"}
            </p>
            <Button
              variant="ghost"
              // onClick={handleResend}
              disabled={isResending}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-medium"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Resend Code"
              )}
            </Button>
          </div>

          <div className="!pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
}
