import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

let submissions: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const errors: Record<string, string> = {};

    if (!body.firstName) errors.firstName = "First name is required";
    if (!body.lastName) errors.lastName = "Last name is required";

    if (!body.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(body.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const submission = {
      ...body,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    submissions.push(submission);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextRequest.json(
      { success: true, data: submission },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (errors) {
    console.error("Form Submition error", errors);
    return NextResponse.json(
      { success: false, errors },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: true, data: submissions },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    }
  );
}
