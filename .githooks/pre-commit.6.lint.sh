#!/usr/bin/env bash

if [ -n "$JS_STAGED" ];
then
  npx eslint $JS_STAGED
fi

if [ -n "$CSS_STAGED" ];
then
  npx stylelint $CSS_STAGED
fi

if [ -n "$JS_STAGED" ] || [ -n "$FLOW_STAGED" ];
then
  npx flow
fi
