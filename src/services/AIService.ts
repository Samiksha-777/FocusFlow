import * as ov from '@intel/openvino';
import { OPEA, MLService } from '@opea/core';
import * as tf from 'tensorflow-js';

interface FocusContext {
  timeOfDay: number;
  currentMood?: string;
  focusedTime: number;
  breakTime: number;
  distractions: number;
}

interface FocusPrediction {
  optimalStartTime: number;
  predictedFocusDuration: number;
  confidence: number;
}

class AIService {
  private opeaService: OPEA;
  private mlService: MLService;
  private model: any;
  private initialized: boolean = false;

  constructor() {
    this.opeaService = new OPEA({
      platform: 'intel',
      accelerator: 'auto', // Automatically detect available Intel hardware
      features: ['ml', 'optimization'],
    });

    this.mlService = this.opeaService.createService('ml', {
      hardware: {
        preference: ['xeon', 'gaudi', 'gpu', 'npu'],
      },
      optimization: {
        level: 'high',
        features: ['quantization', 'pruning'],
      },
    });
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize OpenVINO runtime with Intel hardware optimizations
      const runtime = await ov.createRuntime({
        deviceType: 'CPU',
        optimization: {
          level: 3, // Maximum optimization
          features: ['FP16', 'INT8'],
        },
      });

      // Load and optimize the productivity analysis model
      this.model = await this.mlService.loadModel('productivity-analyzer', {
        type: 'transformer',
        hardware: 'intel-cpu',
        optimization: true,
        quantization: 'INT8',
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize AI Service:', error);
      throw error;
    }
  }

  async analyzeFocusPattern(context: FocusContext) {
    if (!this.initialized) {
      throw new Error('AI Service not initialized');
    }

    try {
      // Convert context to tensor format
      const tensor = tf.tensor([
        context.timeOfDay,
        context.focusedTime,
        context.breakTime,
        context.distractions,
      ]);

      // Run analysis through the optimized model
      const prediction = await this.model.predict(tensor);
      return prediction;
    } catch (error) {
      console.error('Focus pattern analysis failed:', error);
      throw error;
    }
  }

  async generateProductivityTip(context: FocusContext): Promise<string> {
    if (!this.initialized) {
      throw new Error('AI Service not initialized');
    }

    try {
      const analysis = await this.analyzeFocusPattern(context);
      
      const response = await this.mlService.generateResponse(analysis, {
        type: 'productivity-tip',
        length: 'medium',
        context: {
          timeOfDay: context.timeOfDay,
          mood: context.currentMood,
          productivity: {
            focus: context.focusedTime,
            breaks: context.breakTime,
            distractions: context.distractions,
          },
        },
        style: {
          tone: 'encouraging',
          format: 'actionable',
        },
      });

      return response;
    } catch (error) {
      console.error('Tip generation failed:', error);
      throw error;
    }
  }

  async predictBestFocusTime(userPatterns: any): Promise<FocusPrediction> {
    if (!this.initialized) {
      throw new Error('AI Service not initialized');
    }

    try {
      const analysis = await this.model.analyze(userPatterns, {
        type: 'focus-prediction',
        confidence: true,
      });

      return {
        optimalStartTime: analysis.startTime,
        predictedFocusDuration: analysis.duration,
        confidence: analysis.confidence,
      };
    } catch (error) {
      console.error('Focus time prediction failed:', error);
      throw error;
    }
  }
}

export const aiService = new AIService();