'use client';

export default function Footer_() {
    return (
        <footer className="bg-gray-900 text-white border-t-2 border-blue-500">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-500">
                                FitnessApp
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="/" className="hover:underline">
                                        FitnessApp
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">
                                        Tailwind CSS
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Follow us</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-400 sm:text-center">
                        © 2024 <a href="/" className="hover:underline">FitnessApp™</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white ms-5">
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white ms-5">
                            <span className="sr-only">Discord community</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white ms-5">
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white ms-5">
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white ms-5">
                            <span className="sr-only">Dribbble account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
