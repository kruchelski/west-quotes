#!/bin/bash

echo 'Trying to migrate'

npx sequelize-cli db:migrate

echo 'Migration ended'