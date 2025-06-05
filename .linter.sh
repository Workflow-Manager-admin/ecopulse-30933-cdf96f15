#!/bin/bash
cd /home/kavia/workspace/code-generation/ecopulse-30933-cdf96f15/eco_pulse_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

