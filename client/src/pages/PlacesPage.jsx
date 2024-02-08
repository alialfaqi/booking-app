import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../components/Perks";

const PlacesPage = () => {
  const { action } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    addedPhotos: [],
    photoLink: "",
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuest: 1,
  });

  const inputHeader = (text) => {
    return <h2 className="text-xl mt-4 ">{text}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-gray-500">{text}</p>;
  };
  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/upload-by-link", {
      link: formData.photoLink,
    });
    setFormData((prevFromData) => ({
      ...prevFromData,
      addedPhotos: [...prevFromData.addedPhotos, data.fileName],
    }));
    setFormData((prevFromData) => ({
      ...prevFromData,
      photoLink: "",
    }));
  };

  return (
    <>
      <div>
        {action !== "new" ? (
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 px-5 rounded-full"
              to="/account/places/new"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add New Place
            </Link>
          </div>
        ) : (
          <div>
            <form>
              <h2 className="text-xl mt-4 ">Title</h2>
              <p className="text-gray-500">
                Title for your place. should be catchy and short as in
                advertisement
              </p>
              <input
                type="text"
                placeholder="title, for example: My lovely appartment"
              />
              <h2 className="text-xl mt-4 ">Addresss</h2>
              <p className="text-gray-500">Address to this place</p>
              <input type="text" placeholder="adderss" />
              <h2 className="text-xl mt-4 ">Photos</h2>
              <p className="text-gray-500">more = better</p>
              <div className="flex gap-2">
                <input
                  onChange={(e) =>
                    setFormData((prevFromData) => ({
                      ...prevFromData,
                      photoLink: e.target.value,
                    }))
                  }
                  type="text"
                  placeholder="Add using a link ..."
                />
                <button
                  className="bg-gray-200 px-4 rounded-2xl"
                  onClick={addPhotoByLink}
                >
                  Add&nbsp;photo
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {formData.addedPhotos.length > 0 &&
                  formData.addedPhotos.map((link) => <div>{link}</div>)}
                <button className="flex items-center justify-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                  </svg>
                  Upload
                </button>
              </div>
              <h2 className="text-2xl mt-4">Description</h2>
              <p className="text-gray-500 text-sm">description of the place</p>
              <textarea
                onChange={(e) =>
                  setFormData((prevFromData) => ({
                    ...prevFromData,
                    description: e.target.value,
                  }))
                }
              />
              <h2 className="text-2xl mt-4">Perks</h2>
              <p className="text-gray-500 text-sm">
                select all the perks of the place
              </p>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
                <Perks />
              </div>
              <h2 className="text-2xl mt-4">Extra Info</h2>
              <p className="text-gray-500 text-sm">house, rules, etc...</p>
              <textarea
                onChange={(e) =>
                  setFormData((prevFromData) => ({
                    ...prevFromData,
                    extraInfo: e.target.value,
                  }))
                }
              />
              <h2 className="text-2xl mt-4">Check in&out time, max guest</h2>
              <p className="text-gray-500 text-sm">
                add check in and out times, remember to have some time window
                for cleaning the room between guests
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <h3 className="mt-2 -mb-1">Check In time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    onChange={(e) =>
                      setFormData((prevFromData) => ({
                        ...prevFromData,
                        checkIn: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check Out time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    onChange={(e) =>
                      setFormData((prevFromData) => ({
                        ...prevFromData,
                        checkOut: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max guest number</h3>
                  <input
                    type="number"
                    placeholder="14:00"
                    onChange={(e) =>
                      setFormData((prevFromData) => ({
                        ...prevFromData,
                        maxGuest: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <button className="primary my-4">Save</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default PlacesPage;
