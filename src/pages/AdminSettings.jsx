import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";
import {
	ADMIN_SETTINGS_DEFAULTS,
	ADMIN_TIMEZONE_OPTIONS,
	ADMIN_LANGUAGE_OPTIONS,
	ADMIN_THEME_OPTIONS,
	ADMIN_SECURITY_MIN_TIMEOUT,
} from "../utils/constants";

const AdminSettings = () => {
	const currentUser = useAppSelector(selectCurrentUser);

	const initialState = useMemo(
		() => ({
			profile: {
				displayName: currentUser?.name ?? "",
				email: currentUser?.email ?? "",
				phone: currentUser?.phone ?? "",
				designation: currentUser?.designation ?? "Administrator",
			},
			preferences: { ...ADMIN_SETTINGS_DEFAULTS.preferences },
			notifications: { ...ADMIN_SETTINGS_DEFAULTS.notifications },
			security: { ...ADMIN_SETTINGS_DEFAULTS.security },
		}),
		[
			currentUser?.name,
			currentUser?.email,
			currentUser?.phone,
			currentUser?.designation,
		]
	);

	const [settings, setSettings] = useState(initialState);

	useEffect(() => {
		setSettings(initialState);
	}, [initialState]);

	const handleProfileChange = (field) => (event) => {
		const { value } = event.target;
		setSettings((prev) => ({
			...prev,
			profile: {
				...prev.profile,
				[field]: value,
			},
		}));
	};

	const handlePreferenceChange = (field) => (event) => {
		const { value } = event.target;
		setSettings((prev) => ({
			...prev,
			preferences: {
				...prev.preferences,
				[field]: value,
			},
		}));
	};

	const handleSecurityNumberChange = (field) => (event) => {
		const numericValue = Number(event.target.value);
		setSettings((prev) => ({
			...prev,
			security: {
				...prev.security,
				[field]: Number.isNaN(numericValue)
					? prev.security[field]
					: Math.max(ADMIN_SECURITY_MIN_TIMEOUT, numericValue),
			},
		}));
	};

	const handleToggle = (section, field) => () => {
		setSettings((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				[field]: !prev[section][field],
			},
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		toast.success("Settings saved. Changes will sync once APIs are connected.");
	};

	const handleReset = () => {
		setSettings(initialState);
		toast.success("Settings restored to defaults.");
	};

	const isDirty = useMemo(() => {
		return JSON.stringify(settings) !== JSON.stringify(initialState);
	}, [settings, initialState]);

	const renderToggle = (section, field, label, description) => {
		const enabled = settings[section][field];

		return (
			<div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
				<div>
					<p className="font-medium text-gray-800">{label}</p>
					{description && (
						<p className="text-sm text-gray-500 mt-1">{description}</p>
					)}
				</div>
				<button
					type="button"
					onClick={handleToggle(section, field)}
					className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
						enabled ? "bg-[#bb1201]" : "bg-gray-300"
					}`}
					aria-pressed={enabled}
				>
					<span className="sr-only">Toggle {label}</span>
					<span
						className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
							enabled ? "translate-x-5" : "translate-x-1"
						}`}
					/>
				</button>
			</div>
		);
	};

	return (
		<div className="bg-gray-50 min-h-[calc(100vh-120px)] p-4 sm:p-6 lg:p-8">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<h1 className="text-2xl font-semibold text-gray-900">
						Admin Settings
					</h1>
					<p className="text-sm text-gray-500">
						Configure how your administration workspace behaves and
						communicates.
					</p>
				</div>
				<button
					type="button"
					onClick={handleReset}
					className="self-start sm:self-auto px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
					disabled={!isDirty}
				>
					Reset changes
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						Profile & contact
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<label className="block text-sm">
							<span className="font-medium text-gray-700">Display name</span>
							<input
								type="text"
								value={settings.profile.displayName}
								onChange={handleProfileChange("displayName")}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
								placeholder="e.g. Vastu Admin"
							/>
						</label>
						<label className="block text-sm">
							<span className="font-medium text-gray-700">Designation</span>
							<input
								type="text"
								value={settings.profile.designation}
								onChange={handleProfileChange("designation")}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
								placeholder="e.g. Operations Lead"
							/>
						</label>
						<label className="block text-sm">
							<span className="font-medium text-gray-700">Email address</span>
							<input
								type="email"
								value={settings.profile.email}
								onChange={handleProfileChange("email")}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
								placeholder="admin@company.com"
							/>
						</label>
						<label className="block text-sm">
							<span className="font-medium text-gray-700">Contact number</span>
							<input
								type="tel"
								value={settings.profile.phone}
								onChange={handleProfileChange("phone")}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
								placeholder="+91 90000 00000"
							/>
						</label>
					</div>
				</section>

				<section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						Workspace preferences
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<label className="block text-sm">
							<span className="font-medium text-gray-700">Time zone</span>
							<select
								value={settings.preferences.timezone}
								onChange={handlePreferenceChange("timezone")}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
							>
								{ADMIN_TIMEZONE_OPTIONS.map((tz) => (
									<option key={tz} value={tz}>
										{tz}
									</option>
								))}
							</select>
						</label>
						<label className="block text-sm">
							<span className="font-medium text-gray-700">Language</span>
							<select
								value={settings.preferences.language}
								onChange={handlePreferenceChange("language")}
								className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
							>
								{ADMIN_LANGUAGE_OPTIONS.map((language) => (
									<option key={language} value={language}>
										{language}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className="mt-6">
						<span className="text-sm font-medium text-gray-700">Theme</span>
						<div className="mt-3 flex flex-wrap gap-3">
							{ADMIN_THEME_OPTIONS.map((option) => (
								<label
									key={option.value}
									className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
										settings.preferences.theme === option.value
											? "border-[#bb1201] text-[#bb1201] bg-red-50"
											: "border-gray-200 text-gray-600 hover:border-[#bb1201]/50"
									}`}
								>
									<input
										type="radio"
										name="theme"
										value={option.value}
										checked={settings.preferences.theme === option.value}
										onChange={handlePreferenceChange("theme")}
										className="hidden"
									/>
									<span>{option.label}</span>
								</label>
							))}
						</div>
					</div>
				</section>

				<section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						Notifications
					</h2>
					<div className="space-y-4 divide-y divide-gray-100">
						{renderToggle(
							"notifications",
							"productUpdates",
							"Product updates",
							"Stay informed about new admin features and improvements."
						)}
						{renderToggle(
							"notifications",
							"weeklySummary",
							"Weekly performance summary",
							"Receive a weekly snapshot of bookings, revenue, and student engagement."
						)}
						{renderToggle(
							"notifications",
							"marketing",
							"Marketing announcements",
							"Hear about upcoming campaigns and promotional opportunities."
						)}
						{renderToggle(
							"notifications",
							"security",
							"Critical security alerts",
							"Be notified immediately when suspicious logins or changes are detected."
						)}
					</div>
				</section>

				<section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
					<div className="space-y-4 divide-y divide-gray-100">
						{renderToggle(
							"security",
							"twoFactor",
							"Two-factor authentication",
							"Require a one-time code from an authenticator app when logging in."
						)}
						{renderToggle(
							"security",
							"loginAlerts",
							"Login alerts",
							"Send an email whenever an admin logs in from a new device."
						)}
						<div className="pt-4">
							<label className="block text-sm">
								<span className="font-medium text-gray-700">
									Auto sign-out after minutes of inactivity
								</span>
								<input
									type="number"
									min={5}
									value={settings.security.autoSignOutMinutes}
									onChange={handleSecurityNumberChange("autoSignOutMinutes")}
									className="mt-1 w-32 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bb1201]/70 focus:border-[#bb1201]"
								/>
								<span className="mt-1 block text-xs text-gray-500">
									Set to at least 5 minutes to avoid unexpected sign-outs.
								</span>
							</label>
						</div>
					</div>
				</section>

				<div className="flex items-center justify-end gap-3 pt-2">
					<button
						type="button"
						onClick={handleReset}
						className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
						disabled={!isDirty}
					>
						Reset
					</button>
					<button
						type="submit"
						className="px-5 py-2.5 text-sm font-semibold text-white bg-[#bb1201] rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
						disabled={!isDirty}
					>
						Save changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminSettings;
