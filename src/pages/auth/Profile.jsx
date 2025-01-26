import React, { useEffect, useState } from "react";
import {
  deleteProfilePicture,
  uploadProfilePicture,
} from "../../services/userService";
import { updateProfile, getProfile } from "./../../services/authService";
import Button from "./../../components/ui/Button";
import {
  Camera,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { getInitials } from "../../utils/functions";
import { username } from "../../constants";
import toast from "react-hot-toast";

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  profile_picture: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getProfile();
      if (data?.profile_picture) {
        data.profile_picture = `http://127.0.0.1:8000/storage/${data.profile_picture}`; 
      }
      setProfile(data || defaultProfile);
      console.log("Fetched profile:", data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(profile);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const response = await uploadProfilePicture(file);
      if (response?.profile_picture) {
        const fullImageUrl = `http://127.0.0.1:8000${response.profile_picture}`;
        setProfile((prev) => ({ ...prev, profile_picture: fullImageUrl }));
        toast.success("Profile picture uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Error uploading profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    try {
      setIsUploading(true);
      await deleteProfilePicture();
      setProfile((prev) => ({ ...prev, profile_picture: null }));
      toast.success("Profile picture deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      toast.error("Error deleting profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const hasValidProfilePicture =
    profile.profile_picture && profile.profile_picture !== "null";

  return (
    <div className="max-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-darkGray">
                Profile Information
              </h3>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
              >
                {isEditing ? (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  {hasValidProfilePicture ? (
                    <img
                      src={profile.profile_picture}
                      alt={profile.name}
                      className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div
                      className="h-28 w-28 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-semibold border-4 border-white shadow-lg"
                      title={profile.name}
                    >
                      {getInitials(profile.name)}
                    </div>
                  )}

                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 opacity-0 group-hover:opacity-100">
                      <label className="cursor-pointer p-2 hover:text-blue-400 text-white">
                        <Upload className="w-6 h-6" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                        />
                      </label>
                      {hasValidProfilePicture && (
                        <button
                          type="button"
                          onClick={handleDeletePicture}
                          disabled={isUploading}
                          className="p-2 text-white hover:text-red-400"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
