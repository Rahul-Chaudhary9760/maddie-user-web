import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      city,
      pincode,
      packageId,
      packageName,
      price,
      appointmentDate,
      timeSlot,
      address,
      notes,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Patient name and phone number are required.' },
        { status: 400 }
      );
    }

    // Generate clean unique booking reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `MD-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const leadRecord = {
      bookingRef,
      patientName: name.trim(),
      patientPhone: phone.trim(),
      city: city?.trim() || 'Delhi NCR',
      pincode: pincode?.trim() || '110001',
      packageId: packageId || 'full-body-smart',
      packageName: packageName || 'Smart Full Body Health Checkup',
      totalAmount: price || 799,
      appointmentDate: appointmentDate || new Date().toISOString(),
      timeSlot: timeSlot || '07:00-08:00',
      address: address?.trim() || '',
      notes: notes?.trim() || '',
      status: 'pending_confirmation',
      createdAt: new Date().toISOString(),
    };

    console.log('📥 [Maddie Lead Received]:', leadRecord);

    return NextResponse.json({
      success: true,
      message: 'Home collection appointment booked successfully!',
      data: leadRecord,
    });
  } catch (error: any) {
    console.error('Lead processing error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error occurred.' },
      { status: 500 }
    );
  }
}
