#!/bin/bash

# Test Authentication and OTP Flow
# This script tests the complete auth flow with the real email sahargaiche6@gmail.com

BASE_URL="http://localhost:8081/api/auth"

echo "======================================"
echo "Test 1: Health Check"
echo "======================================"
curl -s -X GET "$BASE_URL/test"
echo -e "\n"

echo "======================================"
echo "Test 2: Register User with CITIZEN role"
echo "======================================"
curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testcitizen",
    "email": "sahargaiche6@gmail.com",
    "password": "test123",
    "role": "CITIZEN"
  }' | jq '.'
echo -e "\n"

echo "======================================"
echo "Test 3: Register User with AGENT role"
echo "======================================"
curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testagent",
    "email": "agent@example.com",
    "password": "test123",
    "role": "AGENT"
  }' | jq '.'
echo -e "\n"

echo "======================================"
echo "Test 4: Register User with ADMIN role"
echo "======================================"
curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testadmin",
    "email": "admin@example.com",
    "password": "test123",
    "role": "ADMIN"
  }' | jq '.'
echo -e "\n"

echo "======================================"
echo "Test 5: Login with testcitizen"
echo "======================================"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testcitizen",
    "password": "test123"
  }')
echo "$LOGIN_RESPONSE" | jq '.'
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.accessToken')
echo "Access Token: $ACCESS_TOKEN"
echo -e "\n"

echo "======================================"
echo "Test 6: Decode JWT Token to verify role"
echo "======================================"
if [ ! -z "$ACCESS_TOKEN" ] && [ "$ACCESS_TOKEN" != "null" ]; then
  # Extract payload (second part of JWT)
  PAYLOAD=$(echo $ACCESS_TOKEN | cut -d. -f2)
  # Add padding if needed
  MOD=$((${#PAYLOAD} % 4))
  if [ $MOD -eq 2 ]; then
    PAYLOAD="${PAYLOAD}=="
  elif [ $MOD -eq 3 ]; then
    PAYLOAD="${PAYLOAD}="
  fi
  echo "$PAYLOAD" | base64 -d 2>/dev/null | jq '.'
fi
echo -e "\n"

echo "======================================"
echo "Test 7: Send OTP to testcitizen"
echo "======================================"
curl -s -X POST "$BASE_URL/otp/send" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testcitizen",
    "purpose": "RESET"
  }' | jq '.'
echo -e "\n"

echo "======================================"
echo "IMPORTANT: Check your email sahargaiche6@gmail.com"
echo "Enter the OTP code you received:"
read -p "OTP Code: " OTP_CODE
echo "======================================"

if [ ! -z "$OTP_CODE" ]; then
  echo "======================================"
  echo "Test 8: Verify OTP"
  echo "======================================"
  curl -s -X POST "$BASE_URL/otp/verify" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "testcitizen",
      "code": "'"$OTP_CODE"'",
      "purpose": "RESET"
    }' | jq '.'
  echo -e "\n"
  
  echo "======================================"
  echo "Test 9: Reset Password"
  echo "======================================"
  curl -s -X POST "$BASE_URL/reset" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "testcitizen",
      "newPassword": "newtest123"
    }' | jq '.'
  echo -e "\n"
  
  echo "======================================"
  echo "Test 10: Login with new password"
  echo "======================================"
  curl -s -X POST "$BASE_URL/login" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "testcitizen",
      "password": "newtest123"
    }' | jq '.'
  echo -e "\n"
fi

echo "======================================"
echo "Test 11: Login with AGENT role"
echo "======================================"
AGENT_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testagent",
    "password": "test123"
  }')
echo "$AGENT_RESPONSE" | jq '.'
AGENT_TOKEN=$(echo "$AGENT_RESPONSE" | jq -r '.accessToken')
if [ ! -z "$AGENT_TOKEN" ] && [ "$AGENT_TOKEN" != "null" ]; then
  PAYLOAD=$(echo $AGENT_TOKEN | cut -d. -f2)
  MOD=$((${#PAYLOAD} % 4))
  if [ $MOD -eq 2 ]; then
    PAYLOAD="${PAYLOAD}=="
  elif [ $MOD -eq 3 ]; then
    PAYLOAD="${PAYLOAD}="
  fi
  echo "Agent Token Payload:"
  echo "$PAYLOAD" | base64 -d 2>/dev/null | jq '.'
fi
echo -e "\n"

echo "======================================"
echo "Test 12: Login with ADMIN role"
echo "======================================"
ADMIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testadmin",
    "password": "test123"
  }')
echo "$ADMIN_RESPONSE" | jq '.'
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.accessToken')
if [ ! -z "$ADMIN_TOKEN" ] && [ "$ADMIN_TOKEN" != "null" ]; then
  PAYLOAD=$(echo $ADMIN_TOKEN | cut -d. -f2)
  MOD=$((${#PAYLOAD} % 4))
  if [ $MOD -eq 2 ]; then
    PAYLOAD="${PAYLOAD}=="
  elif [ $MOD -eq 3 ]; then
    PAYLOAD="${PAYLOAD}="
  fi
  echo "Admin Token Payload:"
  echo "$PAYLOAD" | base64 -d 2>/dev/null | jq '.'
fi
echo -e "\n"

echo "======================================"
echo "All tests completed!"
echo "======================================"
