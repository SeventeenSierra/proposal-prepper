import { NextResponse } from 'next/server';
import { aiRouterClient } from 'proposal-prepper-services/ai-router-client';

export async function POST(request: Request) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json({ success: false, error: 'Filename is required' }, { status: 400 });
    }

    // Use simulateUpload from client
    const result = await aiRouterClient.simulateUpload(filename);

    if (result.success && result.data) {
      // Automatically start analysis
      const analysisResult = await aiRouterClient.startAnalysis(
        result.data.id,
        result.data.filename,
        result.data.s3Key
      );

      return NextResponse.json({
        success: true,
        data: {
          ...result.data,
          analysisSessionId: analysisResult.data?.id,
          analysisStatus: analysisResult.data?.status || 'queued',
          message: 'Simulation started successfully',
        },
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Simulation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
