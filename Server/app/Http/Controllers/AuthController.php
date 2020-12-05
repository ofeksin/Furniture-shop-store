<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;
class AuthController extends Controller
{
    public function signup( Request $request ){

        // Firstly, validate the request parameters 
        $request->validate([
            'name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = new User([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->save();

        return response()->json([
            'message' => 'Successfully created user',
        ], 201);
    }

    public function login( Request $request ){
        // Validates user credentials
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        
        // Get email and password from request
        $credentials = $request->only(['email', 'password']);

        // Checks if the credentials are correct
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $authenticatedUser = $request->user();
        $tokenRes = $authenticatedUser->createToken('Personal Access Token');
        $token = $tokenRes->token;
        //Remember me
       
        $token->expires_at = now()->addHours( $request->remember_me ? 24 : 12 );

        // The access token 
        $userToken = $tokenRes->accessToken;

         return response()->json([
            'name'=>$authenticatedUser->name,
            'last_name'=>$authenticatedUser->last_name,
            'message' => 'Logged in successfully',
            'token_type'=> 'Bearer',
            'api_token' =>  $tokenRes->accessToken,
            'expires_at'=>Carbon::parse(
                $tokenRes->token->expires_at
            )->toDateTimeString(),
        ]);    
    }

    public function logout( Request $request){
        $request->user()->token()->revoke();

        return response()->json([
            'message'   => 'Logged out'
        ]);
    }
}
