#!/usr/bin/env bash

if [[ 0 == 0 ]]; then
    sudo ssh -t  "hpws" -L localhost:4977:localhost:34915
fi

pgrep process_name
